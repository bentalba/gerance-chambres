package hotel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    CLASSE GESTION RESERVATIONS                             ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Gestion de l'ensemble des réservations de l'hôtel                        ║
 * ║  Fonctionnalités requises par le PDF:                                     ║
 * ║  • Réservations créées aujourd'hui                                        ║
 * ║  • Réservations qui se terminent aujourd'hui                              ║
 * ║  • Annulation automatique des réservations expirées                       ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
public class GestionReservations {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // ATTRIBUTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    private ArrayList<Reservation> reservations;
    private ArrayList<Client> clients;
    private ArrayList<Chambre> chambres;
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTEUR
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Constructeur - Initialise les listes
     */
    public GestionReservations() {
        this.reservations = new ArrayList<>();
        this.clients = new ArrayList<>();
        this.chambres = new ArrayList<>();
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // GESTION DES CLIENTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Ajoute un client à la liste
     * @param client Client à ajouter
     */
    public void ajouterClient(Client client) {
        clients.add(client);
    }
    
    /**
     * Recherche un client par ID
     * @param id ID du client
     * @return Client trouvé ou null
     */
    public Client rechercherClient(int id) {
        for (Client c : clients) {
            if (c.getId() == id) {
                return c;
            }
        }
        return null;
    }
    
    /**
     * Vérifie si un client existe
     * @param id ID du client
     * @return true si le client existe
     */
    public boolean testerClientExistant(int id) {
        return rechercherClient(id) != null;
    }
    
    /**
     * Retourne la liste des clients
     * @return ArrayList de clients
     */
    public ArrayList<Client> getClients() {
        return clients;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // GESTION DES CHAMBRES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Ajoute une chambre à la liste
     * @param chambre Chambre à ajouter
     */
    public void ajouterChambre(Chambre chambre) {
        if (chambres.size() >= Reservation.MAX_CHAMBRES) {
            System.out.println("⚠️ L'hôtel a déjà " + Reservation.MAX_CHAMBRES + " chambres!");
            return;
        }
        chambres.add(chambre);
    }
    
    /**
     * Recherche une chambre par numéro
     * @param numero Numéro de la chambre
     * @return Chambre trouvée ou null
     */
    public Chambre rechercherChambre(String numero) {
        for (Chambre c : chambres) {
            if (c.getNumero().equals(numero)) {
                return c;
            }
        }
        return null;
    }
    
    /**
     * Retourne la liste des chambres
     * @return ArrayList de chambres
     */
    public ArrayList<Chambre> getChambres() {
        return chambres;
    }
    
    /**
     * Vérifie si une chambre est disponible pour une période donnée
     * @param chambre Chambre à vérifier
     * @param dateDebut Date de début
     * @param dateFin Date de fin
     * @return true si disponible
     */
    public boolean chambreDisponible(Chambre chambre, LocalDateTime dateDebut, LocalDateTime dateFin) {
        for (Reservation r : reservations) {
            // Ignorer les réservations annulées
            if (r.getEtat().equals(Reservation.ETAT_ANNULEE)) {
                continue;
            }
            
            // Vérifier si la chambre est dans cette réservation
            if (r.verifierChambreReservee(chambre)) {
                // Vérifier le chevauchement de dates
                if (!(dateFin.isBefore(r.getDateDebut()) || dateDebut.isAfter(r.getDateFin()))) {
                    return false; // Il y a chevauchement
                }
            }
        }
        return true;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // GESTION DES RESERVATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Ajoute une réservation à la liste
     * @param reservation Réservation à ajouter
     */
    public void ajouterReservation(Reservation reservation) {
        reservations.add(reservation);
    }
    
    /**
     * Recherche une réservation par code
     * @param code Code de la réservation
     * @return Réservation trouvée ou null
     */
    public Reservation rechercherReservation(String code) {
        for (Reservation r : reservations) {
            if (r.getCode().equals(code)) {
                return r;
            }
        }
        return null;
    }
    
    /**
     * Vérifie si une réservation existe
     * @param code Code de la réservation
     * @return true si la réservation existe
     */
    public boolean reservationExiste(String code) {
        return rechercherReservation(code) != null;
    }
    
    /**
     * Modifie une réservation existante
     * @param code Code de la réservation
     * @param nouvelleRes Nouvelles données
     * @return true si modification réussie
     */
    public boolean modifierReservation(String code, Reservation nouvelleRes) {
        for (int i = 0; i < reservations.size(); i++) {
            if (reservations.get(i).getCode().equals(code)) {
                reservations.set(i, nouvelleRes);
                return true;
            }
        }
        return false;
    }
    
    /**
     * Supprime une réservation
     * @param code Code de la réservation
     * @return true si suppression réussie
     */
    public boolean supprimerReservation(String code) {
        for (int i = 0; i < reservations.size(); i++) {
            if (reservations.get(i).getCode().equals(code)) {
                reservations.remove(i);
                return true;
            }
        }
        return false;
    }
    
    /**
     * Retourne la liste de toutes les réservations
     * @return ArrayList de réservations
     */
    public ArrayList<Reservation> getReservations() {
        return reservations;
    }
    
    /**
     * Change l'état d'une réservation
     * @param code Code de la réservation
     * @param nouvelEtat Nouvel état
     * @return true si changement réussi
     */
    public boolean changerEtatReservation(String code, String nouvelEtat) {
        Reservation r = rechercherReservation(code);
        if (r != null) {
            r.setEtat(nouvelEtat);
            return true;
        }
        return false;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // METHODES SPECIFIQUES DU PDF
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Retourne les réservations créées aujourd'hui
     * @return ArrayList de réservations créées aujourd'hui
     */
    public ArrayList<Reservation> reservationsCreeesAujourdhui() {
        ArrayList<Reservation> resultat = new ArrayList<>();
        LocalDate aujourdhui = LocalDate.now();
        
        for (Reservation r : reservations) {
            if (r.getDateDebut() != null && 
                r.getDateDebut().toLocalDate().equals(aujourdhui)) {
                resultat.add(r);
            }
        }
        
        return resultat;
    }
    
    /**
     * Retourne les réservations qui se terminent aujourd'hui
     * @return ArrayList de réservations se terminant aujourd'hui
     */
    public ArrayList<Reservation> reservationsQuiSeTerminentAujourdhui() {
        ArrayList<Reservation> resultat = new ArrayList<>();
        LocalDate aujourdhui = LocalDate.now();
        
        for (Reservation r : reservations) {
            if (r.getDateFin() != null && 
                r.getDateFin().toLocalDate().equals(aujourdhui)) {
                resultat.add(r);
            }
        }
        
        return resultat;
    }
    
    /**
     * Retourne les réservations expirées (non annulées)
     * @return ArrayList de réservations expirées
     */
    public ArrayList<Reservation> reservationsExpirees() {
        ArrayList<Reservation> resultat = new ArrayList<>();
        
        for (Reservation r : reservations) {
            if (r.estExpiree() && !r.getEtat().equals(Reservation.ETAT_ANNULEE)) {
                resultat.add(r);
            }
        }
        
        return resultat;
    }
    
    /**
     * Annule automatiquement toutes les réservations expirées du jour
     * @return Nombre de réservations annulées
     */
    public int autoCloturerReservationsDuJour() {
        int compteur = 0;
        
        for (Reservation r : reservations) {
            if (r.seTermineAujourdhui() && 
                !r.getEtat().equals(Reservation.ETAT_ANNULEE)) {
                r.annuler();
                compteur++;
            }
        }
        
        System.out.println("🔄 " + compteur + " réservation(s) clôturée(s) automatiquement.");
        return compteur;
    }
    
    /**
     * Annule les réservations en attente expirées
     * @return Nombre de réservations annulées
     */
    public int annulerReservationsExpirees() {
        int compteur = 0;
        
        for (Reservation r : reservations) {
            if (r.estExpiree() && r.getEtat().equals(Reservation.ETAT_EN_ATTENTE)) {
                r.annuler();
                compteur++;
            }
        }
        
        System.out.println("❌ " + compteur + " réservation(s) expirée(s) annulée(s).");
        return compteur;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // AFFICHAGE
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Affiche toutes les réservations
     */
    public void afficherToutesReservations() {
        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║           LISTE DE TOUTES LES RESERVATIONS               ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        
        if (reservations.isEmpty()) {
            System.out.println("  (Aucune réservation)");
        } else {
            for (Reservation r : reservations) {
                r.afficher();
            }
        }
        
        System.out.println("\nTotal: " + reservations.size() + " réservation(s)");
    }
    
    /**
     * Affiche les réservations créées aujourd'hui
     */
    public void afficherReservationsAujourdhui() {
        ArrayList<Reservation> aujourdhui = reservationsCreeesAujourdhui();
        
        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║         RESERVATIONS CREEES AUJOURD'HUI                  ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        
        if (aujourdhui.isEmpty()) {
            System.out.println("  (Aucune réservation créée aujourd'hui)");
        } else {
            for (Reservation r : aujourdhui) {
                r.afficher();
            }
        }
        
        System.out.println("\nTotal: " + aujourdhui.size() + " réservation(s)");
    }
    
    /**
     * Affiche les réservations qui se terminent aujourd'hui
     */
    public void afficherReservationsSeTerminantAujourdhui() {
        ArrayList<Reservation> finAujourdhui = reservationsQuiSeTerminentAujourdhui();
        
        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║       RESERVATIONS SE TERMINANT AUJOURD'HUI              ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        
        if (finAujourdhui.isEmpty()) {
            System.out.println("  (Aucune réservation se terminant aujourd'hui)");
        } else {
            for (Reservation r : finAujourdhui) {
                r.afficher();
            }
        }
        
        System.out.println("\nTotal: " + finAujourdhui.size() + " réservation(s)");
    }
    
    /**
     * Affiche les réservations expirées
     */
    public void afficherReservationsExpirees() {
        ArrayList<Reservation> expirees = reservationsExpirees();
        
        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║            RESERVATIONS EXPIREES                         ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        
        if (expirees.isEmpty()) {
            System.out.println("  (Aucune réservation expirée)");
        } else {
            for (Reservation r : expirees) {
                r.afficher();
            }
        }
        
        System.out.println("\nTotal: " + expirees.size() + " réservation(s)");
    }
    
    /**
     * Affiche toutes les chambres
     */
    public void afficherToutesChambres() {
        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║              LISTE DES CHAMBRES DE L'HOTEL               ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        
        if (chambres.isEmpty()) {
            System.out.println("  (Aucune chambre)");
        } else {
            for (Chambre c : chambres) {
                c.afficher();
            }
        }
        
        System.out.println("\nTotal: " + chambres.size() + "/" + Reservation.MAX_CHAMBRES + " chambre(s)");
    }
    
    /**
     * Affiche tous les clients
     */
    public void afficherTousClients() {
        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║                 LISTE DES CLIENTS                        ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
        
        if (clients.isEmpty()) {
            System.out.println("  (Aucun client)");
        } else {
            for (Client c : clients) {
                c.afficher();
            }
        }
        
        System.out.println("\nTotal: " + clients.size() + " client(s)");
    }
}
