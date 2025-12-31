package hotel;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         CLASSE DAO MYSQL                                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Data Access Object - Connexion et requêtes MySQL                         ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
public class HotelDAO {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURATION CONNEXION
    // ═══════════════════════════════════════════════════════════════════════════
    
    private static final String URL = "jdbc:mysql://localhost:3306/hotel";
    private static final String USER = "root";
    private static final String PASSWORD = ""; // Modifier selon votre config
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CONNEXION
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Établit la connexion à la base de données
     * @return Connection ou null si erreur
     */
    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            System.out.println("❌ Driver MySQL non trouvé! Ajoutez mysql-connector-java.jar");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("❌ Erreur connexion MySQL: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    /**
     * Teste la connexion
     * @return true si connexion réussie
     */
    public static boolean testerConnexion() {
        Connection conn = getConnection();
        if (conn != null) {
            try {
                conn.close();
                System.out.println("✅ Connexion MySQL réussie!");
                return true;
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CRUD CLIENT
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Insère un client dans la base
     * @param client Client à insérer
     * @return ID généré ou -1 si erreur
     */
    public static int insertClient(Client client) {
        String sql = "INSERT INTO client (nom, prenom, adresse) VALUES (?, ?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pst.setString(1, client.getNom());
            pst.setString(2, client.getPrenom());
            pst.setString(3, client.getAdresse());
            
            pst.executeUpdate();
            
            ResultSet rs = pst.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                client.setId(id);
                System.out.println("✅ Client inséré avec ID: " + id);
                return id;
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur insertion client: " + e.getMessage());
        }
        return -1;
    }
    
    /**
     * Récupère tous les clients
     * @return ArrayList de clients
     */
    public static ArrayList<Client> getAllClients() {
        ArrayList<Client> clients = new ArrayList<>();
        String sql = "SELECT * FROM client";
        
        try (Connection conn = getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                Client c = new Client(
                    rs.getInt("id"),
                    rs.getString("nom"),
                    rs.getString("prenom"),
                    rs.getString("adresse")
                );
                clients.add(c);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur récupération clients: " + e.getMessage());
        }
        
        return clients;
    }
    
    /**
     * Recherche un client par ID
     * @param id ID du client
     * @return Client ou null
     */
    public static Client getClientById(int id) {
        String sql = "SELECT * FROM client WHERE id = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql)) {
            
            pst.setInt(1, id);
            ResultSet rs = pst.executeQuery();
            
            if (rs.next()) {
                return new Client(
                    rs.getInt("id"),
                    rs.getString("nom"),
                    rs.getString("prenom"),
                    rs.getString("adresse")
                );
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur recherche client: " + e.getMessage());
        }
        
        return null;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CRUD CHAMBRE
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Insère une chambre dans la base
     * @param chambre Chambre à insérer
     * @return ID généré ou -1 si erreur
     */
    public static int insertChambre(Chambre chambre) {
        String sql = "INSERT INTO chambre (numero, telephone) VALUES (?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pst.setString(1, chambre.getNumero());
            pst.setString(2, chambre.getTelephone());
            
            pst.executeUpdate();
            
            ResultSet rs = pst.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                chambre.setId(id);
                System.out.println("✅ Chambre insérée avec ID: " + id);
                return id;
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur insertion chambre: " + e.getMessage());
        }
        return -1;
    }
    
    /**
     * Récupère toutes les chambres
     * @return ArrayList de chambres
     */
    public static ArrayList<Chambre> getAllChambres() {
        ArrayList<Chambre> chambres = new ArrayList<>();
        String sql = "SELECT * FROM chambre";
        
        try (Connection conn = getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                Chambre c = new Chambre(
                    rs.getInt("id"),
                    rs.getString("numero"),
                    rs.getString("telephone")
                );
                chambres.add(c);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur récupération chambres: " + e.getMessage());
        }
        
        return chambres;
    }
    
    /**
     * Recherche une chambre par numéro
     * @param numero Numéro de la chambre
     * @return Chambre ou null
     */
    public static Chambre getChambreByNumero(String numero) {
        String sql = "SELECT * FROM chambre WHERE numero = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql)) {
            
            pst.setString(1, numero);
            ResultSet rs = pst.executeQuery();
            
            if (rs.next()) {
                return new Chambre(
                    rs.getInt("id"),
                    rs.getString("numero"),
                    rs.getString("telephone")
                );
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur recherche chambre: " + e.getMessage());
        }
        
        return null;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // CRUD RESERVATION
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Insère une réservation dans la base
     * @param reservation Réservation à insérer
     * @return ID généré ou -1 si erreur
     */
    public static int insertReservation(Reservation reservation) {
        String sql = "INSERT INTO reservation (code, nb_chambres, client_id, etat, date_debut, date_fin) VALUES (?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pst.setString(1, reservation.getCode());
            pst.setInt(2, reservation.getNbChambres());
            pst.setInt(3, reservation.getClient() != null ? reservation.getClient().getId() : 0);
            pst.setString(4, reservation.getEtat());
            pst.setTimestamp(5, Timestamp.valueOf(reservation.getDateDebut()));
            pst.setTimestamp(6, Timestamp.valueOf(reservation.getDateFin()));
            
            pst.executeUpdate();
            
            ResultSet rs = pst.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                reservation.setId(id);
                
                // Insérer les chambres associées
                insertReservationChambres(id, reservation.getChambres());
                
                System.out.println("✅ Réservation insérée avec ID: " + id);
                return id;
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur insertion réservation: " + e.getMessage());
        }
        return -1;
    }
    
    /**
     * Insère les associations réservation-chambre
     * @param reservationId ID de la réservation
     * @param chambres Liste des chambres
     */
    private static void insertReservationChambres(int reservationId, ArrayList<Chambre> chambres) {
        String sql = "INSERT INTO reservation_chambre (res_id, chambre_id) VALUES (?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql)) {
            
            for (Chambre c : chambres) {
                pst.setInt(1, reservationId);
                pst.setInt(2, c.getId());
                pst.addBatch();
            }
            
            pst.executeBatch();
        } catch (SQLException e) {
            System.out.println("❌ Erreur insertion chambres réservation: " + e.getMessage());
        }
    }
    
    /**
     * Récupère toutes les réservations avec leurs chambres
     * @return ArrayList de réservations
     */
    public static ArrayList<Reservation> getAllReservations() {
        ArrayList<Reservation> reservations = new ArrayList<>();
        String sql = "SELECT * FROM reservation";
        
        try (Connection conn = getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                int clientId = rs.getInt("client_id");
                Client client = getClientById(clientId);
                
                Reservation r = new Reservation(
                    rs.getInt("id"),
                    rs.getString("code"),
                    client,
                    rs.getTimestamp("date_debut").toLocalDateTime(),
                    rs.getTimestamp("date_fin").toLocalDateTime()
                );
                r.setEtat(rs.getString("etat"));
                
                // Charger les chambres de cette réservation
                loadReservationChambres(r);
                
                reservations.add(r);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur récupération réservations: " + e.getMessage());
        }
        
        return reservations;
    }
    
    /**
     * Charge les chambres associées à une réservation
     * @param reservation Réservation à charger
     */
    private static void loadReservationChambres(Reservation reservation) {
        String sql = "SELECT c.* FROM chambre c " +
                     "JOIN reservation_chambre rc ON c.id = rc.chambre_id " +
                     "WHERE rc.res_id = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql)) {
            
            pst.setInt(1, reservation.getId());
            ResultSet rs = pst.executeQuery();
            
            while (rs.next()) {
                Chambre c = new Chambre(
                    rs.getInt("id"),
                    rs.getString("numero"),
                    rs.getString("telephone")
                );
                reservation.ajouterChambre(c);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur chargement chambres: " + e.getMessage());
        }
    }
    
    /**
     * Récupère les réservations créées aujourd'hui
     * @return ArrayList de réservations
     */
    public static ArrayList<Reservation> getReservationsAujourdhui() {
        ArrayList<Reservation> reservations = new ArrayList<>();
        String sql = "SELECT * FROM reservation WHERE DATE(date_debut) = CURDATE()";
        
        try (Connection conn = getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                Client client = getClientById(rs.getInt("client_id"));
                
                Reservation r = new Reservation(
                    rs.getInt("id"),
                    rs.getString("code"),
                    client,
                    rs.getTimestamp("date_debut").toLocalDateTime(),
                    rs.getTimestamp("date_fin").toLocalDateTime()
                );
                r.setEtat(rs.getString("etat"));
                loadReservationChambres(r);
                
                reservations.add(r);
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur récupération réservations aujourd'hui: " + e.getMessage());
        }
        
        return reservations;
    }
    
    /**
     * Met à jour l'état d'une réservation
     * @param code Code de la réservation
     * @param nouvelEtat Nouvel état
     * @return true si mise à jour réussie
     */
    public static boolean updateEtatReservation(String code, String nouvelEtat) {
        String sql = "UPDATE reservation SET etat = ? WHERE code = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement pst = conn.prepareStatement(sql)) {
            
            pst.setString(1, nouvelEtat);
            pst.setString(2, code);
            
            int rows = pst.executeUpdate();
            if (rows > 0) {
                System.out.println("✅ État de la réservation " + code + " mis à jour: " + nouvelEtat);
                return true;
            }
        } catch (SQLException e) {
            System.out.println("❌ Erreur mise à jour état: " + e.getMessage());
        }
        
        return false;
    }
    
    /**
     * Annule les réservations expirées en base
     * @return Nombre de réservations annulées
     */
    public static int annulerReservationsExpirees() {
        String sql = "UPDATE reservation SET etat = 'annulee' " +
                     "WHERE date_fin < NOW() AND etat = 'en_attente'";
        
        try (Connection conn = getConnection();
             Statement st = conn.createStatement()) {
            
            int rows = st.executeUpdate(sql);
            System.out.println("❌ " + rows + " réservation(s) expirée(s) annulée(s) en base.");
            return rows;
        } catch (SQLException e) {
            System.out.println("❌ Erreur annulation expirées: " + e.getMessage());
        }
        
        return 0;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALISATION DES 80 CHAMBRES
    // ═══════════════════════════════════════════════════════════════════════════
    
    /**
     * Initialise les 80 chambres de l'hôtel (8 étages x 10 chambres)
     */
    public static void initialiserChambres() {
        System.out.println("🏨 Initialisation des 80 chambres...");
        
        for (int etage = 1; etage <= 8; etage++) {
            for (int num = 1; num <= 10; num++) {
                String numero = String.format("%d%02d", etage, num);
                String telephone = String.format("05%d-%02d-%02d-%02d-%02d", 
                    etage, num, num, etage, num);
                
                Chambre chambre = new Chambre(0, numero, telephone);
                insertChambre(chambre);
            }
        }
        
        System.out.println("✅ 80 chambres créées avec succès!");
    }
}
