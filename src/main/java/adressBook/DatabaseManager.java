package adressBook;

import java.sql.*;
import java.util.HashMap;

public class DatabaseManager {

    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/contacts";

    // Database credentials
    static final String USER = "root";
    static final String PASS = "";

    private static final DatabaseManager instance = new DatabaseManager();

    public static DatabaseManager getInstance() {
        return instance;
    }

    private DatabaseManager() {
    }

    public HashMap<Integer, Contact> tryDBConnection() {

        // FIXME should replace some of the redundant connection code, switch sql
        // statements ...

        Connection conn = null;
        Statement stmt = null;
        try {
            // STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            // STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            // STEP 4: Execute a query
            System.out.println("Creating statement...");
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT id, name, forename, email, mobile, work, adress, town, zip FROM contacts";
            ResultSet rs = stmt.executeQuery(sql);

            HashMap<Integer, Contact> contactsById = new HashMap<>();

            // STEP 5: Extract data from result set
            while (rs.next()) {
                int id = rs.getInt("id");
                String forename = rs.getString("forename");
                String name = rs.getString("name");
                String email = rs.getString("email");
                String mobile = rs.getString("mobile");
                String work = rs.getString("work");
                String adress = rs.getString("adress");
                String town = rs.getString("town");
                String zip = rs.getString("zip");

                Contact contact = new Contact(id, forename, name, email, mobile, work, adress, town, zip);
                contactsById.put(contact.getId(), contact);

            }
            // STEP 6: Clean-up environment
            rs.close();
            stmt.close();
            conn.close();
            System.out.println("Goodbye! success");
            return contactsById;
        } catch (SQLException se) {
            // Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            // Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            // finally block used to close resources
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            } // nothing we can do
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            } // end finally try
        }
        System.out.println("Goodbye!");
        return null;
    }

    public Integer addEntry(Contact contact) {
        Connection conn = null;
        Statement stmt = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");

            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Creating statement...");
            String forename = contact.getForename();
            String name = contact.getName();
            String email = contact.getEmail();
            String mobile = contact.getMobile();
            String work = contact.getWork();
            String adress = contact.getAdress();
            String town = contact.getTown();
            String zip = contact.getZipcode();

            stmt = conn.createStatement();
            String sql;

            PreparedStatement sqlStatement;
            sqlStatement = conn
                    .prepareStatement("insert into contacts (name, forename, email, mobile, work, adress, town, zip) "
                            + "values(?, ?, ?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
            sqlStatement.setString(1, name);
            sqlStatement.setString(2, forename);
            sqlStatement.setString(3, email);
            sqlStatement.setString(4, mobile);
            sqlStatement.setString(5, work);
            sqlStatement.setString(6, adress);
            sqlStatement.setString(7, town);
            sqlStatement.setString(8, zip);

            System.out.print(sqlStatement.toString());
            sqlStatement.executeUpdate();
            ResultSet rs = sqlStatement.getGeneratedKeys();
            if (rs.next()) {
                contact.setId(rs.getInt(1));
                return rs.getInt(1);
            }
            return -1;
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        System.out.println("Goodbye!");
        return -1;

    }

    public boolean updateEntry(Contact contact) {
        Connection conn = null;
        Statement stmt = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");

            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Creating statement...");
            Integer Id = contact.getId();
            String forename = contact.getForename();
            String name = contact.getName();
            String email = contact.getEmail();
            String mobile = contact.getMobile();
            String work = contact.getWork();
            String adress = contact.getAdress();
            String town = contact.getTown();
            String zip = contact.getZipcode();

            stmt = conn.createStatement();
            String sql;

            PreparedStatement sqlStatement;
            sqlStatement = conn.prepareStatement(
                    "UPDATE contacts SET  forename= ?, name = ?, email=?, mobile=?, work=?, adress=?, town=?, zip=?  "
                            + "WHERE id = ?;");
            sqlStatement.setString(1, forename);
            sqlStatement.setString(2, name);
            sqlStatement.setString(3, email);
            sqlStatement.setString(4, mobile);
            sqlStatement.setString(5, work);
            sqlStatement.setString(6, adress);
            sqlStatement.setString(7, town);
            sqlStatement.setString(8, zip);
            sqlStatement.setInt(9, Id);

            System.out.print(sqlStatement.toString());
            Integer rs2 = sqlStatement.executeUpdate();
            if (rs2 > 0) {
                System.out.println("Goodbye! success");
                return true;
            } else {
                return false;
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        System.out.println("Goodbye!");
        return false;

    }

    public boolean deleteEntry(Integer Id) {
        Connection conn = null;
        Statement stmt = null;
        try {

            if (Id != null) {
                Class.forName("com.mysql.jdbc.Driver");

                System.out.println("Connecting to database...");
                conn = DriverManager.getConnection(DB_URL, USER, PASS);

                System.out.println("Creating statement...");

                stmt = conn.createStatement();
                String sql;
                PreparedStatement sqlStatement;
                sqlStatement = conn.prepareStatement("DELETE FROM contacts WHERE id = ?");
                sqlStatement.setInt(1, Id);

                System.out.print(sqlStatement.toString());
                Integer rs2 = sqlStatement.executeUpdate();
                if (rs2 > 0) {
                    System.out.println("Goodbye! success");
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        System.out.println("Goodbye!");

        return false;
    }

    public boolean deleteAll() {
        Connection conn = null;
        Statement stmt = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");

            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            System.out.println("Creating statement...");

            stmt = conn.createStatement();
            String sql;
            PreparedStatement sqlStatement;
            sqlStatement = conn.prepareStatement("DELETE FROM contacts");
            System.out.print(sqlStatement.toString());
            Integer rs2 = sqlStatement.executeUpdate();
            if (rs2 > 0) {
                System.out.println("Goodbye! success");
                return true;
            } else {
                return false;
            }

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        System.out.println("Goodbye!");
        return false;

    }

    public static void main(String[] args) {
        DatabaseManager.getInstance().tryDBConnection();
    }

}
