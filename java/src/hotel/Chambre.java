package hotel;

import java.util.Scanner;

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         CLASSE CHAMBRE                                     ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Représente une chambre de l'hôtel (80 chambres max)                      ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
public class Chambre {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // ATTRIBUTS
    // ═══════════════════════════════════════════════════════════════════════════
    
    private int id;
    private String numero;      // Ex: "101", "205", "802"
    private String telephone;   // Téléphone de la chambre
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTEURS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Constructeur par défaut
     */
    public Chambre() {
        this.id = 0;
        this.numero = "";
        this.telephone = "";
    }
    
    /**
     * Constructeur avec paramètres
     * @param id Identifiant unique
     * @param numero Numéro de la chambre (ex: "101")
     * @param telephone Numéro de téléphone de la chambre
     */
    public Chambre(int id, String numero, String telephone) {
        this.id = id;
        this.numero = numero;
        this.telephone = telephone;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // GETTERS
    // ═══════════════════════════════════════════════════════════════════════════
    
    public int getId() {
        return id;
    }
    
    public String getNumero() {
        return numero;
    }
    
    public String getTelephone() {
        return telephone;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SETTERS
    // ═══════════════════════════════════════════════════════════════════════════
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setNumero(String numero) {
        this.numero = numero;
    }
    
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // METHODES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Saisie interactive d'une chambre
     * @param scanner Scanner pour la lecture
     */
    public void saisir(Scanner scanner) {
        System.out.println("\n--- Saisie Chambre ---");
        
        System.out.print("Numéro de chambre: ");
        this.numero = scanner.nextLine();
        
        System.out.print("Téléphone: ");
        this.telephone = scanner.nextLine();
    }
    
    /**
     * Affichage des informations de la chambre
     */
    public void afficher() {
        System.out.println("╔════════════════════════════════╗");
        System.out.println("║  Chambre " + String.format("%-20s", numero) + " ║");
        System.out.println("╠════════════════════════════════╣");
        System.out.println("║  ID: " + String.format("%-24d", id) + " ║");
        System.out.println("║  Tél: " + String.format("%-23s", telephone) + " ║");
        System.out.println("╚════════════════════════════════╝");
    }
    
    /**
     * Vérifie si deux chambres sont identiques (même numéro)
     * @param autre Chambre à comparer
     * @return true si même numéro
     */
    public boolean equals(Chambre autre) {
        if (autre == null) return false;
        return this.numero.equals(autre.numero);
    }
    
    @Override
    public String toString() {
        return "Chambre " + numero + " (Tél: " + telephone + ")";
    }
}
