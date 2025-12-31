package hotel;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    PROGRAMME PRINCIPAL - MAIN                              ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Menu interactif pour la gestion de l'hôtel                               ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
public class Main {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // ATTRIBUTS STATIQUES
    // ═══════════════════════════════════════════════════════════════════════════
    
    private static Scanner scanner = new Scanner(System.in);
    private static GestionReservations gestion = new GestionReservations();
    private static int compteurReservation = 1;
    
    // ═══════════════════════════════════════════════════════════════════════════
    // MAIN
    // ═══════════════════════════════════════════════════════════════════════════
    
    public static void main(String[] args) {
        System.out.println("\n");
        System.out.println("╔══════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                                                                          ║");
        System.out.println("║     🏨  SYSTEME DE GESTION HOTEL - RESERVATIONS  🏨                      ║");
        System.out.println("║                                                                          ║");
        System.out.println("║     Projet EMSI - Java POO avec Héritage                                 ║");
        System.out.println("║     Préparé par: Oussama SAJJI                                           ║");
        System.out.println("║                                                                          ║");
        System.out.println("╚══════════════════════════════════════════════════════════════════════════╝");
        System.out.println();
        
        // Initialiser les données de démonstration
        initialiserDonneesDemonstration();
        
        // Lancer le menu principal
        menuPrincipal();
        
        System.out.println("\n👋 Au revoir! Merci d'avoir utilisé le système de gestion hôtelière.");
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // MENU PRINCIPAL
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Affiche et gère le menu principal
     */
    public static void menuPrincipal() {
        int choix;
        
        do {
            System.out.println("\n╔══════════════════════════════════════════════════════════╗");
            System.out.println("║                  MENU PRINCIPAL                          ║");
            System.out.println("╠══════════════════════════════════════════════════════════╣");
            System.out.println("║  1. 📋 Gestion des Réservations                          ║");
            System.out.println("║  2. 🛏️  Gestion des Chambres                              ║");
            System.out.println("║  3. 👥 Gestion des Clients                               ║");
            System.out.println("║  4. 📊 Rapports et Statistiques                          ║");
            System.out.println("║  5. 🔄 Connexion MySQL (Test)                            ║");
            System.out.println("║  0. 🚪 Quitter                                           ║");
            System.out.println("╚══════════════════════════════════════════════════════════╝");
            System.out.print("Votre choix: ");
            
            choix = lireEntier();
            
            switch (choix) {
                case 1: menuReservations(); break;
                case 2: menuChambres(); break;
                case 3: menuClients(); break;
                case 4: menuRapports(); break;
                case 5: HotelDAO.testerConnexion(); break;
                case 0: break;
                default: System.out.println("⚠️ Choix invalide!");
            }
        } while (choix != 0);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // MENU RESERVATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Menu de gestion des réservations
     */
    public static void menuReservations() {
        int choix;
        
        do {
            System.out.println("\n╔══════════════════════════════════════════════════════════╗");
            System.out.println("║              GESTION DES RESERVATIONS                    ║");
            System.out.println("╠══════════════════════════════════════════════════════════╣");
            System.out.println("║  1. ➕ Créer une réservation                             ║");
            System.out.println("║  2. 📋 Afficher toutes les réservations                  ║");
            System.out.println("║  3. 🔍 Rechercher une réservation                        ║");
            System.out.println("║  4. 🛏️  Ajouter chambre à une réservation                 ║");
            System.out.println("║  5. ❌ Supprimer chambre d'une réservation               ║");
            System.out.println("║  6. ✅ Valider une réservation                           ║");
            System.out.println("║  7. 🚫 Annuler une réservation                           ║");
            System.out.println("║  8. ⏰ Annuler réservations expirées (auto)              ║");
            System.out.println("║  0. ⬅️  Retour                                            ║");
            System.out.println("╚══════════════════════════════════════════════════════════╝");
            System.out.print("Votre choix: ");
            
            choix = lireEntier();
            
            switch (choix) {
                case 1: creerReservation(); break;
                case 2: gestion.afficherToutesReservations(); break;
                case 3: rechercherReservation(); break;
                case 4: ajouterChambreReservation(); break;
                case 5: supprimerChambreReservation(); break;
                case 6: validerReservation(); break;
                case 7: annulerReservation(); break;
                case 8: gestion.annulerReservationsExpirees(); break;
                case 0: break;
                default: System.out.println("⚠️ Choix invalide!");
            }
        } while (choix != 0);
    }
    
    /**
     * Crée une nouvelle réservation
     */
    private static void creerReservation() {
        System.out.println("\n--- CREATION D'UNE RESERVATION ---");
        
        // Afficher les clients disponibles
        gestion.afficherTousClients();
        
        System.out.print("ID du client: ");
        int clientId = lireEntier();
        
        Client client = gestion.rechercherClient(clientId);
        if (client == null) {
            System.out.println("⚠️ Client non trouvé!");
            return;
        }
        
        // Générer le code de réservation
        String code = "RES-" + String.format("%04d", compteurReservation++);
        
        // Créer la réservation
        Reservation reservation = new Reservation(code, client);
        reservation.setId(compteurReservation);
        
        // Saisir les dates
        scanner.nextLine(); // Vider le buffer
        reservation.saisir(scanner);
        
        // Ajouter des chambres
        System.out.print("Combien de chambres? ");
        int nbChambres = lireEntier();
        
        gestion.afficherToutesChambres();
        
        for (int i = 0; i < nbChambres; i++) {
            System.out.print("Numéro de la chambre " + (i+1) + ": ");
            scanner.nextLine();
            String numeroChambre = scanner.nextLine();
            
            Chambre chambre = gestion.rechercherChambre(numeroChambre);
            if (chambre != null) {
                reservation.ajouterChambre(chambre);
            } else {
                System.out.println("⚠️ Chambre " + numeroChambre + " non trouvée!");
            }
        }
        
        // Ajouter à la gestion
        gestion.ajouterReservation(reservation);
        
        System.out.println("\n✅ Réservation créée avec succès!");
        reservation.afficher();
    }
    
    /**
     * Recherche une réservation par code
     */
    private static void rechercherReservation() {
        System.out.print("Code de la réservation: ");
        scanner.nextLine();
        String code = scanner.nextLine();
        
        Reservation r = gestion.rechercherReservation(code);
        if (r != null) {
            r.afficher();
        } else {
            System.out.println("⚠️ Réservation non trouvée!");
        }
    }
    
    /**
     * Ajoute une chambre à une réservation existante
     */
    private static void ajouterChambreReservation() {
        System.out.print("Code de la réservation: ");
        scanner.nextLine();
        String code = scanner.nextLine();
        
        Reservation r = gestion.rechercherReservation(code);
        if (r == null) {
            System.out.println("⚠️ Réservation non trouvée!");
            return;
        }
        
        gestion.afficherToutesChambres();
        
        System.out.print("Numéro de la chambre à ajouter: ");
        String numeroChambre = scanner.nextLine();
        
        Chambre chambre = gestion.rechercherChambre(numeroChambre);
        if (chambre != null) {
            r.ajouterChambre(chambre);
        } else {
            System.out.println("⚠️ Chambre non trouvée!");
        }
    }
    
    /**
     * Supprime une chambre d'une réservation
     */
    private static void supprimerChambreReservation() {
        System.out.print("Code de la réservation: ");
        scanner.nextLine();
        String code = scanner.nextLine();
        
        Reservation r = gestion.rechercherReservation(code);
        if (r == null) {
            System.out.println("⚠️ Réservation non trouvée!");
            return;
        }
        
        r.afficher();
        
        System.out.print("Numéro de la chambre à supprimer: ");
        String numeroChambre = scanner.nextLine();
        
        Chambre chambre = gestion.rechercherChambre(numeroChambre);
        if (chambre != null) {
            r.supprimerChambre(chambre);
        } else {
            System.out.println("⚠️ Chambre non trouvée!");
        }
    }
    
    /**
     * Valide une réservation
     */
    private static void validerReservation() {
        System.out.print("Code de la réservation à valider: ");
        scanner.nextLine();
        String code = scanner.nextLine();
        
        Reservation r = gestion.rechercherReservation(code);
        if (r != null) {
            r.valider();
        } else {
            System.out.println("⚠️ Réservation non trouvée!");
        }
    }
    
    /**
     * Annule une réservation
     */
    private static void annulerReservation() {
        System.out.print("Code de la réservation à annuler: ");
        scanner.nextLine();
        String code = scanner.nextLine();
        
        Reservation r = gestion.rechercherReservation(code);
        if (r != null) {
            r.annuler();
        } else {
            System.out.println("⚠️ Réservation non trouvée!");
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // MENU CHAMBRES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Menu de gestion des chambres
     */
    public static void menuChambres() {
        int choix;
        
        do {
            System.out.println("\n╔══════════════════════════════════════════════════════════╗");
            System.out.println("║                GESTION DES CHAMBRES                      ║");
            System.out.println("╠══════════════════════════════════════════════════════════╣");
            System.out.println("║  1. 📋 Afficher toutes les chambres                      ║");
            System.out.println("║  2. 🔍 Rechercher une chambre                            ║");
            System.out.println("║  3. ➕ Ajouter une chambre                               ║");
            System.out.println("║  0. ⬅️  Retour                                            ║");
            System.out.println("╚══════════════════════════════════════════════════════════╝");
            System.out.print("Votre choix: ");
            
            choix = lireEntier();
            
            switch (choix) {
                case 1: gestion.afficherToutesChambres(); break;
                case 2: rechercherChambre(); break;
                case 3: ajouterChambre(); break;
                case 0: break;
                default: System.out.println("⚠️ Choix invalide!");
            }
        } while (choix != 0);
    }
    
    /**
     * Recherche une chambre par numéro
     */
    private static void rechercherChambre() {
        System.out.print("Numéro de la chambre: ");
        scanner.nextLine();
        String numero = scanner.nextLine();
        
        Chambre c = gestion.rechercherChambre(numero);
        if (c != null) {
            c.afficher();
        } else {
            System.out.println("⚠️ Chambre non trouvée!");
        }
    }
    
    /**
     * Ajoute une nouvelle chambre
     */
    private static void ajouterChambre() {
        Chambre chambre = new Chambre();
        chambre.setId(gestion.getChambres().size() + 1);
        scanner.nextLine();
        chambre.saisir(scanner);
        gestion.ajouterChambre(chambre);
        System.out.println("✅ Chambre ajoutée!");
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // MENU CLIENTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Menu de gestion des clients
     */
    public static void menuClients() {
        int choix;
        
        do {
            System.out.println("\n╔══════════════════════════════════════════════════════════╗");
            System.out.println("║                 GESTION DES CLIENTS                      ║");
            System.out.println("╠══════════════════════════════════════════════════════════╣");
            System.out.println("║  1. 📋 Afficher tous les clients                         ║");
            System.out.println("║  2. 🔍 Rechercher un client                              ║");
            System.out.println("║  3. ➕ Ajouter un client                                 ║");
            System.out.println("║  4. ✓  Tester si client existe                           ║");
            System.out.println("║  0. ⬅️  Retour                                            ║");
            System.out.println("╚══════════════════════════════════════════════════════════╝");
            System.out.print("Votre choix: ");
            
            choix = lireEntier();
            
            switch (choix) {
                case 1: gestion.afficherTousClients(); break;
                case 2: rechercherClient(); break;
                case 3: ajouterClient(); break;
                case 4: testerClientExistant(); break;
                case 0: break;
                default: System.out.println("⚠️ Choix invalide!");
            }
        } while (choix != 0);
    }
    
    /**
     * Recherche un client par ID
     */
    private static void rechercherClient() {
        System.out.print("ID du client: ");
        int id = lireEntier();
        
        Client c = gestion.rechercherClient(id);
        if (c != null) {
            c.afficher();
        } else {
            System.out.println("⚠️ Client non trouvé!");
        }
    }
    
    /**
     * Ajoute un nouveau client
     */
    private static void ajouterClient() {
        Client client = new Client();
        client.setId(gestion.getClients().size() + 1);
        scanner.nextLine();
        client.saisir(scanner);
        gestion.ajouterClient(client);
        System.out.println("✅ Client ajouté avec ID: " + client.getId());
    }
    
    /**
     * Teste si un client existe
     */
    private static void testerClientExistant() {
        System.out.print("ID du client à tester: ");
        int id = lireEntier();
        
        if (gestion.testerClientExistant(id)) {
            System.out.println("✅ Le client #" + id + " existe!");
        } else {
            System.out.println("❌ Le client #" + id + " n'existe pas!");
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // MENU RAPPORTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Menu des rapports et statistiques
     */
    public static void menuRapports() {
        int choix;
        
        do {
            System.out.println("\n╔══════════════════════════════════════════════════════════╗");
            System.out.println("║              RAPPORTS ET STATISTIQUES                    ║");
            System.out.println("╠══════════════════════════════════════════════════════════╣");
            System.out.println("║  1. 📅 Réservations créées aujourd'hui                   ║");
            System.out.println("║  2. 🏁 Réservations se terminant aujourd'hui             ║");
            System.out.println("║  3. ⏰ Réservations expirées                             ║");
            System.out.println("║  4. 🔄 Clôturer auto les réservations du jour            ║");
            System.out.println("║  0. ⬅️  Retour                                            ║");
            System.out.println("╚══════════════════════════════════════════════════════════╝");
            System.out.print("Votre choix: ");
            
            choix = lireEntier();
            
            switch (choix) {
                case 1: gestion.afficherReservationsAujourdhui(); break;
                case 2: gestion.afficherReservationsSeTerminantAujourdhui(); break;
                case 3: gestion.afficherReservationsExpirees(); break;
                case 4: gestion.autoCloturerReservationsDuJour(); break;
                case 0: break;
                default: System.out.println("⚠️ Choix invalide!");
            }
        } while (choix != 0);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALISATION DONNEES DE DEMONSTRATION
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Initialise des données de test
     */
    private static void initialiserDonneesDemonstration() {
        System.out.println("🔄 Initialisation des données de démonstration...\n");
        
        // Créer 3 clients
        gestion.ajouterClient(new Client(1, "Dupont", "Alice", "10 Rue des Fleurs, Casablanca"));
        gestion.ajouterClient(new Client(2, "Benali", "Youssef", "45 Avenue Mohammed V, Rabat"));
        gestion.ajouterClient(new Client(3, "Martin", "Sophie", "23 Boulevard Hassan II, Marrakech"));
        
        // Créer 80 chambres (8 étages x 10 chambres)
        for (int etage = 1; etage <= 8; etage++) {
            for (int num = 1; num <= 10; num++) {
                String numero = String.format("%d%02d", etage, num);
                String telephone = String.format("05%d-%02d-%02d-%02d-%02d", etage, num, num, etage, num);
                gestion.ajouterChambre(new Chambre(gestion.getChambres().size() + 1, numero, telephone));
            }
        }
        
        // Créer 2 réservations de test
        Reservation res1 = new Reservation("RES-0001", gestion.rechercherClient(1));
        res1.setId(1);
        res1.setDateDebut(LocalDateTime.now());
        res1.setDateFin(LocalDateTime.now().plusDays(3));
        res1.ajouterChambre(gestion.rechercherChambre("101"));
        res1.ajouterChambre(gestion.rechercherChambre("102"));
        gestion.ajouterReservation(res1);
        compteurReservation++;
        
        Reservation res2 = new Reservation("RES-0002", gestion.rechercherClient(2));
        res2.setId(2);
        res2.setDateDebut(LocalDateTime.now().minusDays(1));
        res2.setDateFin(LocalDateTime.now().plusDays(1));
        res2.ajouterChambre(gestion.rechercherChambre("201"));
        res2.valider();
        gestion.ajouterReservation(res2);
        compteurReservation++;
        
        System.out.println("✅ " + gestion.getClients().size() + " clients créés");
        System.out.println("✅ " + gestion.getChambres().size() + " chambres créées");
        System.out.println("✅ " + gestion.getReservations().size() + " réservations de test créées");
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // UTILITAIRES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Lit un entier avec gestion d'erreur
     * @return Entier lu ou -1 si erreur
     */
    private static int lireEntier() {
        try {
            return scanner.nextInt();
        } catch (Exception e) {
            scanner.nextLine(); // Vider le buffer
            return -1;
        }
    }
}
