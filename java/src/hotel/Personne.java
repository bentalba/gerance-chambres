package hotel;

import java.util.Scanner;

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    CLASSE ABSTRAITE PERSONNE                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Classe mère pour l'héritage POO                                          ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
public abstract class Personne {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // ATTRIBUTS (protected pour l'héritage)
    // ═══════════════════════════════════════════════════════════════════════════
    
    protected int id;
    protected String nom;
    protected String prenom;
    protected String adresse;
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTEURS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Constructeur par défaut
     */
    public Personne() {
        this.id = 0;
        this.nom = "";
        this.prenom = "";
        this.adresse = "";
    }
    
    /**
     * Constructeur avec paramètres
     * @param id Identifiant unique
     * @param nom Nom de famille
     * @param prenom Prénom
     * @param adresse Adresse complète
     */
    public Personne(int id, String nom, String prenom, String adresse) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // GETTERS
    // ═══════════════════════════════════════════════════════════════════════════
    
    public int getId() {
        return id;
    }
    
    public String getNom() {
        return nom;
    }
    
    public String getPrenom() {
        return prenom;
    }
    
    public String getAdresse() {
        return adresse;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SETTERS
    // ═══════════════════════════════════════════════════════════════════════════
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setNom(String nom) {
        this.nom = nom;
    }
    
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    
    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // METHODES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Saisie interactive des informations
     * @param scanner Scanner pour la lecture
     */
    public void saisir(Scanner scanner) {
        System.out.print("Nom: ");
        this.nom = scanner.nextLine();
        
        System.out.print("Prénom: ");
        this.prenom = scanner.nextLine();
        
        System.out.print("Adresse: ");
        this.adresse = scanner.nextLine();
    }
    
    /**
     * Affichage des informations
     */
    public void afficher() {
        System.out.println("ID: " + id);
        System.out.println("Nom: " + nom);
        System.out.println("Prénom: " + prenom);
        System.out.println("Adresse: " + adresse);
    }
    
    @Override
    public String toString() {
        return nom + " " + prenom;
    }
}
