-- ╔═══════════════════════════════════════════════════════════════════════════╗
-- ║          SCRIPT SQL - CREATION BASE DE DONNEES HOTEL                       ║
-- ╠═══════════════════════════════════════════════════════════════════════════╣
-- ║  Base de données MySQL pour le système de gestion hôtelière               ║
-- ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
-- ╚═══════════════════════════════════════════════════════════════════════════╝

-- ═══════════════════════════════════════════════════════════════════════════
-- CREATION DE LA BASE DE DONNEES
-- ═══════════════════════════════════════════════════════════════════════════

DROP DATABASE IF EXISTS hotel;
CREATE DATABASE hotel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hotel;

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE CLIENT
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE client (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    adresse VARCHAR(200),
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE CHAMBRE (80 chambres max)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE chambre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(10) NOT NULL UNIQUE,
    telephone VARCHAR(20),
    etage INT GENERATED ALWAYS AS (CAST(LEFT(numero, 1) AS UNSIGNED)) STORED
) ENGINE=InnoDB;

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE RESERVATION
-- États: en_attente, validee, annulee
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE reservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) NOT NULL UNIQUE,
    nb_chambres INT DEFAULT 0,
    client_id INT NOT NULL,
    etat ENUM('en_attente', 'validee', 'annulee') DEFAULT 'en_attente',
    date_debut DATETIME NOT NULL,
    date_fin DATETIME NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE ASSOCIATION RESERVATION-CHAMBRE (Many-to-Many)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE reservation_chambre (
    res_id INT NOT NULL,
    chambre_id INT NOT NULL,
    
    PRIMARY KEY (res_id, chambre_id),
    FOREIGN KEY (res_id) REFERENCES reservation(id) ON DELETE CASCADE,
    FOREIGN KEY (chambre_id) REFERENCES chambre(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ═══════════════════════════════════════════════════════════════════════════
-- DONNEES DE DEMONSTRATION
-- ═══════════════════════════════════════════════════════════════════════════

-- 3 Clients de test
INSERT INTO client (nom, prenom, adresse) VALUES
    ('Dupont', 'Alice', '10 Rue des Fleurs, Casablanca'),
    ('Benali', 'Youssef', '45 Avenue Mohammed V, Rabat'),
    ('Martin', 'Sophie', '23 Boulevard Hassan II, Marrakech');

-- 80 Chambres (8 étages x 10 chambres)
DELIMITER //
CREATE PROCEDURE initialiser_chambres()
BEGIN
    DECLARE etage INT DEFAULT 1;
    DECLARE num INT DEFAULT 1;
    DECLARE numero_chambre VARCHAR(10);
    DECLARE telephone VARCHAR(20);
    
    WHILE etage <= 8 DO
        SET num = 1;
        WHILE num <= 10 DO
            SET numero_chambre = CONCAT(etage, LPAD(num, 2, '0'));
            SET telephone = CONCAT('05', etage, '-', LPAD(num, 2, '0'), '-', LPAD(num, 2, '0'), '-', LPAD(etage, 2, '0'), '-', LPAD(num, 2, '0'));
            INSERT INTO chambre (numero, telephone) VALUES (numero_chambre, telephone);
            SET num = num + 1;
        END WHILE;
        SET etage = etage + 1;
    END WHILE;
END //
DELIMITER ;

CALL initialiser_chambres();
DROP PROCEDURE initialiser_chambres;

-- 2 Réservations de test
INSERT INTO reservation (code, nb_chambres, client_id, etat, date_debut, date_fin) VALUES
    ('RES-0001', 2, 1, 'en_attente', NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY)),
    ('RES-0002', 1, 2, 'validee', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 1 DAY));

-- Associations chambres-réservations
INSERT INTO reservation_chambre (res_id, chambre_id) VALUES
    (1, 1),  -- RES-0001 → Chambre 101
    (1, 2),  -- RES-0001 → Chambre 102
    (2, 11); -- RES-0002 → Chambre 201

-- ═══════════════════════════════════════════════════════════════════════════
-- VUES UTILES
-- ═══════════════════════════════════════════════════════════════════════════

-- Vue: Réservations avec détails client
CREATE VIEW vue_reservations AS
SELECT 
    r.id,
    r.code,
    r.nb_chambres,
    r.etat,
    r.date_debut,
    r.date_fin,
    DATEDIFF(r.date_fin, r.date_debut) AS duree_jours,
    c.id AS client_id,
    CONCAT(c.nom, ' ', c.prenom) AS client_nom,
    c.adresse AS client_adresse
FROM reservation r
JOIN client c ON r.client_id = c.id;

-- Vue: Chambres avec leur statut actuel
CREATE VIEW vue_chambres_statut AS
SELECT 
    ch.id,
    ch.numero,
    ch.telephone,
    ch.etage,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM reservation_chambre rc
            JOIN reservation r ON rc.res_id = r.id
            WHERE rc.chambre_id = ch.id
            AND r.etat != 'annulee'
            AND NOW() BETWEEN r.date_debut AND r.date_fin
        ) THEN 'occupee'
        ELSE 'disponible'
    END AS statut
FROM chambre ch;

-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFICATION
-- ═══════════════════════════════════════════════════════════════════════════

SELECT '✅ Base de données hotel créée avec succès!' AS message;
SELECT CONCAT('   - ', COUNT(*), ' clients') AS info FROM client
UNION ALL
SELECT CONCAT('   - ', COUNT(*), ' chambres') FROM chambre
UNION ALL
SELECT CONCAT('   - ', COUNT(*), ' réservations') FROM reservation;
