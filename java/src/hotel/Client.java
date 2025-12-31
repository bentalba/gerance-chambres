package hotel;

import java.util.Scanner;

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         CLASSE CLIENT                                      ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Hérite de Personne - Représente un client de l'hôtel                     ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
public class Client extends Personne {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTEURS
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Constructeur par défaut
     */
    public Client() {
        super();
    }
    
    /**
     * Constructeur avec paramètres
     * @param id Identifiant unique du client
     * @param nom Nom de famille
     * @param prenom Prénom
     * @param adresse Adresse complète
     */
    public Client(int id, String nom, String prenom, String adresse) {
        super(id, nom, prenom, adresse);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // METHODES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Saisie interactive d'un client
     * @param scanner Scanner pour la lecture
     */
    @Override
    public void saisir(Scanner scanner) {
        System.out.println("\n--- Saisie Client ---");
        super.saisir(scanner);
    }
    
    /**
     * Affichage des informations du client
     */
    @Override
    public void afficher() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║         CLIENT                 ║");
        System.out.println("╠════════════════════════════════╣");
        super.afficher();
        System.out.println("╚════════════════════════════════╝");
    }
    
    /**
     * Vérifie si deux clients sont identiques (même ID)
     * @param autre Client à comparer
     * @return true si même ID
     */
    public boolean equals(Client autre) {
        if (autre == null) return false;
        return this.id == autre.id;
    }
    
    @Override
    public String toString() {
        return "Client #" + id + ": " + super.toString();
    }
}
