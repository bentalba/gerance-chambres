package hotel;

import java.time.LocalDateTime;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    CLASSE RESERVATION (COEUR DU PROJET)                    ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Gestion d'une réservation avec ArrayList<Chambre>                        ║
 * ║  Maximum 80 chambres par hôtel                                            ║
 * ║  États: en_attente, validee, annulee                                      ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
public class Reservation {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTANTES
    // ═══════════════════════════════════════════════════════════════════════════
    
    public static final int MAX_CHAMBRES = 80;
    public static final String ETAT_EN_ATTENTE = "en_attente";
    public static final String ETAT_VALIDEE = "validee";
    public static final String ETAT_ANNULEE = "annulee";
    
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    
    // ═══════════════════════════════════════════════════════════════════════════
    // ATTRIBUTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    private int id;
    private String code;
    private int nbChambres;
    private ArrayList<Chambre> chambres;
    private Client client;
    private String etat;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTEURS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Constructeur par défaut
     */
    public Reservation() {
        this.id = 0;
        this.code = "";
        this.nbChambres = 0;
        this.chambres = new ArrayList<>();
        this.client = null;
        this.etat = ETAT_EN_ATTENTE;
        this.dateDebut = LocalDateTime.now();
        this.dateFin = LocalDateTime.now().plusDays(1);
    }
    
    /**
     * Constructeur avec code et client
     * @param code Code unique de la réservation
     * @param client Client effectuant la réservation
     */
    public Reservation(String code, Client client) {
        this();
        this.code = code;
        this.client = client;
    }
    
    /**
     * Constructeur complet
     * @param id Identifiant unique
     * @param code Code de réservation
     * @param client Client
     * @param dateDebut Date de début
     * @param dateFin Date de fin
     */
    public Reservation(int id, String code, Client client, LocalDateTime dateDebut, LocalDateTime dateFin) {
        this.id = id;
        this.code = code;
        this.nbChambres = 0;
        this.chambres = new ArrayList<>();
        this.client = client;
        this.etat = ETAT_EN_ATTENTE;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // GETTERS
    // ═══════════════════════════════════════════════════════════════════════════
    
    public int getId() { return id; }
    public String getCode() { return code; }
    public int getNbChambres() { return nbChambres; }
    public ArrayList<Chambre> getChambres() { return chambres; }
    public Client getClient() { return client; }
    public String getEtat() { return etat; }
    public LocalDateTime getDateDebut() { return dateDebut; }
    public LocalDateTime getDateFin() { return dateFin; }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SETTERS
    // ═══════════════════════════════════════════════════════════════════════════
    
    public void setId(int id) { this.id = id; }
    public void setCode(String code) { this.code = code; }
    public void setClient(Client client) { this.client = client; }
    public void setEtat(String etat) { this.etat = etat; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // METHODES PRINCIPALES (selon le PDF)
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Vérifie si une chambre est déjà réservée dans cette réservation
     * @param chambre Chambre à vérifier
     * @return true si la chambre est déjà dans la réservation
     */
    public boolean verifierChambreReservee(Chambre chambre) {
        for (Chambre c : chambres) {
            if (c.equals(chambre)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Ajoute une chambre à la réservation
     * @param chambre Chambre à ajouter
     * @return true si ajout réussi, false si max atteint ou doublon
     */
    public boolean ajouterChambre(Chambre chambre) {
        // Vérifier la limite de 80 chambres
        if (chambres.size() >= MAX_CHAMBRES) {
            System.out.println("⚠️ Limite de " + MAX_CHAMBRES + " chambres atteinte!");
            return false;
        }
        
        // Vérifier si la chambre est déjà réservée
        if (verifierChambreReservee(chambre)) {
            System.out.println("⚠️ La chambre " + chambre.getNumero() + " est déjà dans cette réservation!");
            return false;
        }
        
        // Ajouter la chambre
        chambres.add(chambre);
        nbChambres++;
        System.out.println("✅ Chambre " + chambre.getNumero() + " ajoutée à la réservation.");
        return true;
    }
    
    /**
     * Supprime une chambre de la réservation
     * @param chambre Chambre à supprimer
     */
    public void supprimerChambre(Chambre chambre) {
        boolean supprimee = false;
        for (int i = 0; i < chambres.size(); i++) {
            if (chambres.get(i).equals(chambre)) {
                chambres.remove(i);
                nbChambres--;
                supprimee = true;
                System.out.println("✅ Chambre " + chambre.getNumero() + " supprimée de la réservation.");
                break;
            }
        }
        
        if (!supprimee) {
            System.out.println("⚠️ Chambre non trouvée dans cette réservation.");
        }
    }
    
    /**
     * Calcule la durée de la réservation en heures
     * @return Durée en heures
     */
    public long calculerDuree() {
        if (dateDebut == null || dateFin == null) {
            return 0;
        }
        return Duration.between(dateDebut, dateFin).toHours();
    }
    
    /**
     * Calcule la durée de la réservation en jours
     * @return Durée en jours
     */
    public long calculerDureeJours() {
        long heures = calculerDuree();
        return (heures + 23) / 24; // Arrondi supérieur
    }
    
    /**
     * Valide la réservation
     */
    public void valider() {
        if (etat.equals(ETAT_ANNULEE)) {
            System.out.println("⚠️ Impossible de valider une réservation annulée.");
            return;
        }
        this.etat = ETAT_VALIDEE;
        System.out.println("✅ Réservation " + code + " validée.");
    }
    
    /**
     * Annule la réservation
     */
    public void annuler() {
        this.etat = ETAT_ANNULEE;
        System.out.println("❌ Réservation " + code + " annulée.");
    }
    
    /**
     * Vérifie si la réservation est expirée (date de fin dépassée)
     * @return true si expirée
     */
    public boolean estExpiree() {
        return dateFin != null && dateFin.isBefore(LocalDateTime.now());
    }
    
    /**
     * Vérifie si la réservation commence aujourd'hui
     * @return true si commence aujourd'hui
     */
    public boolean commenceAujourdhui() {
        if (dateDebut == null) return false;
        LocalDateTime maintenant = LocalDateTime.now();
        return dateDebut.toLocalDate().equals(maintenant.toLocalDate());
    }
    
    /**
     * Vérifie si la réservation se termine aujourd'hui
     * @return true si se termine aujourd'hui
     */
    public boolean seTermineAujourdhui() {
        if (dateFin == null) return false;
        LocalDateTime maintenant = LocalDateTime.now();
        return dateFin.toLocalDate().equals(maintenant.toLocalDate());
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SAISIE ET AFFICHAGE
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Saisie interactive d'une réservation
     * @param scanner Scanner pour la lecture
     */
    public void saisir(Scanner scanner) {
        System.out.println("\n--- Saisie Réservation ---");
        
        System.out.print("Code de réservation: ");
        this.code = scanner.nextLine();
        
        System.out.print("Date début (jj/mm/aaaa HH:mm): ");
        String dateDebutStr = scanner.nextLine();
        try {
            this.dateDebut = LocalDateTime.parse(dateDebutStr, FORMATTER);
        } catch (Exception e) {
            System.out.println("Format invalide, utilisation de la date actuelle.");
            this.dateDebut = LocalDateTime.now();
        }
        
        System.out.print("Date fin (jj/mm/aaaa HH:mm): ");
        String dateFinStr = scanner.nextLine();
        try {
            this.dateFin = LocalDateTime.parse(dateFinStr, FORMATTER);
        } catch (Exception e) {
            System.out.println("Format invalide, utilisation de date début + 1 jour.");
            this.dateFin = this.dateDebut.plusDays(1);
        }
    }
    
    /**
     * Affichage des informations de la réservation
     */
    public void afficher() {
        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║               RESERVATION " + String.format("%-30s", code) + " ║");
        System.out.println("╠══════════════════════════════════════════════════════════╣");
        System.out.println("║  ID: " + String.format("%-50d", id) + " ║");
        System.out.println("║  Client: " + String.format("%-46s", (client != null ? client.toString() : "N/A")) + " ║");
        System.out.println("║  État: " + String.format("%-48s", getEtatAffichage()) + " ║");
        System.out.println("║  Début: " + String.format("%-47s", dateDebut.format(FORMATTER)) + " ║");
        System.out.println("║  Fin: " + String.format("%-49s", dateFin.format(FORMATTER)) + " ║");
        System.out.println("║  Durée: " + String.format("%-47s", calculerDureeJours() + " jour(s)") + " ║");
        System.out.println("║  Nb Chambres: " + String.format("%-41d", nbChambres) + " ║");
        System.out.println("╠══════════════════════════════════════════════════════════╣");
        System.out.println("║  Chambres réservées:                                     ║");
        
        if (chambres.isEmpty()) {
            System.out.println("║    (aucune chambre)                                      ║");
        } else {
            for (Chambre c : chambres) {
                System.out.println("║    - " + String.format("%-50s", c.toString()) + " ║");
            }
        }
        
        System.out.println("╚══════════════════════════════════════════════════════════╝");
    }
    
    /**
     * Retourne l'état avec emoji
     * @return État formaté
     */
    private String getEtatAffichage() {
        switch (etat) {
            case ETAT_EN_ATTENTE: return "⏳ En attente";
            case ETAT_VALIDEE: return "✅ Validée";
            case ETAT_ANNULEE: return "❌ Annulée";
            default: return etat;
        }
    }
    
    @Override
    public String toString() {
        return "Réservation " + code + " - " + (client != null ? client.toString() : "N/A") + 
               " - " + nbChambres + " chambre(s) - " + etat;
    }
}
