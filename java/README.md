# 🏨 Projet Java POO - Gestion Hôtel (Réservations)

**Projet EMSI - Préparé par Oussama SAJJI**

## 📋 Description

Système de gestion des réservations d'hôtel en Java POO avec :
- **Héritage** : `Personne` (abstraite) → `Client`
- **ArrayList** : Gestion dynamique des chambres par réservation
- **MySQL** : Persistance des données via JDBC
- **80 chambres** : 8 étages × 10 chambres

## 🏗️ Structure du Projet

```
java/
├── src/
│   └── hotel/
│       ├── Personne.java         # Classe abstraite (héritage)
│       ├── Client.java           # Hérite de Personne
│       ├── Chambre.java          # Chambre d'hôtel
│       ├── Reservation.java      # Cœur du projet (ArrayList<Chambre>)
│       ├── GestionReservations.java  # Gestion globale
│       ├── HotelDAO.java         # Connexion MySQL (JDBC)
│       └── Main.java             # Programme principal avec menu
├── sql/
│   └── hotel.sql                 # Script création base MySQL
└── README.md
```

## 📊 Diagramme de Classes (UML)

```
┌─────────────────────────┐
│    <<abstract>>         │
│      Personne           │
├─────────────────────────┤
│ # id: int               │
│ # nom: String           │
│ # prenom: String        │
│ # adresse: String       │
├─────────────────────────┤
│ + saisir()              │
│ + afficher()            │
│ + toString()            │
└───────────┬─────────────┘
            │ hérite
            ▼
┌─────────────────────────┐
│        Client           │
├─────────────────────────┤
│ (attributs hérités)     │
├─────────────────────────┤
│ + equals(Client)        │
└─────────────────────────┘

┌─────────────────────────┐
│       Chambre           │
├─────────────────────────┤
│ - id: int               │
│ - numero: String        │
│ - telephone: String     │
├─────────────────────────┤
│ + saisir()              │
│ + afficher()            │
│ + equals(Chambre)       │
└─────────────────────────┘

┌───────────────────────────────────────┐
│            Reservation                │
├───────────────────────────────────────┤
│ - id: int                             │
│ - code: String                        │
│ - nbChambres: int                     │
│ - chambres: ArrayList<Chambre>        │
│ - client: Client                      │
│ - etat: String                        │
│ - dateDebut: LocalDateTime            │
│ - dateFin: LocalDateTime              │
├───────────────────────────────────────┤
│ + verifierChambreReservee(Chambre)    │
│ + ajouterChambre(Chambre): boolean    │
│ + supprimerChambre(Chambre)           │
│ + calculerDuree(): long               │
│ + valider()                           │
│ + annuler()                           │
│ + estExpiree(): boolean               │
│ + afficher()                          │
└───────────────────────────────────────┘
```

## 🚀 Installation

### 1. Prérequis
- JDK 8 ou supérieur
- NetBeans IDE
- MySQL Server (XAMPP/WAMP ou MySQL Workbench)
- MySQL Connector/J (mysql-connector-java-8.x.jar)

### 2. Créer la base de données
```bash
mysql -u root -p < java/sql/hotel.sql
```

Ou via phpMyAdmin : importer `java/sql/hotel.sql`

### 3. Configurer la connexion
Modifier dans `HotelDAO.java` :
```java
private static final String URL = "jdbc:mysql://localhost:3306/hotel";
private static final String USER = "root";
private static final String PASSWORD = ""; // Votre mot de passe
```

### 4. Ajouter MySQL Connector dans NetBeans
1. Right-click sur "Libraries"
2. Add JAR/Folder
3. Sélectionner `mysql-connector-java-8.x.jar`

### 5. Exécuter
Run → Run Project ou F6

## 📝 Fonctionnalités (selon le PDF)

| # | Fonctionnalité | Méthode |
|---|----------------|---------|
| 1 | Vérifier si chambre réservée | `verifierChambreReservee(Chambre)` |
| 2 | Ajouter chambre (max 80) | `ajouterChambre(Chambre)` |
| 3 | Supprimer chambre | `supprimerChambre(Chambre)` |
| 4 | Calculer durée | `calculerDuree()` |
| 5 | Valider réservation | `valider()` |
| 6 | Annuler réservation | `annuler()` |
| 7 | Réservations aujourd'hui | `reservationsCreeesAujourdhui()` |
| 8 | Réservations se terminant | `reservationsQuiSeTerminentAujourdhui()` |
| 9 | Auto-clôturer expirées | `autoCloturerReservationsDuJour()` |
| 10 | Tester client existant | `testerClientExistant(id)` |

## 🖥️ Menu Console

```
╔══════════════════════════════════════════════════════════╗
║                  MENU PRINCIPAL                          ║
╠══════════════════════════════════════════════════════════╣
║  1. 📋 Gestion des Réservations                          ║
║  2. 🛏️  Gestion des Chambres                              ║
║  3. 👥 Gestion des Clients                               ║
║  4. 📊 Rapports et Statistiques                          ║
║  5. 🔄 Connexion MySQL (Test)                            ║
║  0. 🚪 Quitter                                           ║
╚══════════════════════════════════════════════════════════╝
```

## 📦 Tables MySQL

```sql
client (id, nom, prenom, adresse)
chambre (id, numero, telephone)
reservation (id, code, nb_chambres, client_id, etat, date_debut, date_fin)
reservation_chambre (res_id, chambre_id)  -- Many-to-Many
```

## ✅ Points respectés du cahier des charges

- [x] Classe abstraite `Personne` avec héritage
- [x] `Client` hérite de `Personne`
- [x] `Chambre` avec méthode `equals()`
- [x] `Reservation` avec `ArrayList<Chambre>`
- [x] Maximum 80 chambres par hôtel
- [x] États : en_attente, validée, annulée
- [x] Calcul de durée en heures/jours
- [x] Réservations créées aujourd'hui
- [x] Réservations se terminant aujourd'hui
- [x] Annulation automatique des expirées
- [x] Persistance MySQL avec JDBC

---

**© 2024 EMSI - Projet réalisé par Oussama SAJJI**
