package adressBook;

import java.sql.*;
import java.util.HashMap;

public class databaseManager {


    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/contacts";

    //  Database credentials
    static final String USER = "root";
    static final String PASS = "";


    private static final databaseManager instance = new databaseManager();

    public static databaseManager getInstance() {
        return instance;
    }

    private databaseManager() {
    }


    public HashMap<Integer, Contact> tryDBConnection() {

        //FIXME if this.contacthashmap != null, get key from there
        //FIXME if == null then get connection to db
        // FIXME on update / add -> overwrite the hashmap

        Connection conn = null;
        Statement stmt = null;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            //STEP 4: Execute a query
            System.out.println("Creating statement...");
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT id, name, forename, email, mobile, work, adress, town, zip FROM contacts";
            ResultSet rs = stmt.executeQuery(sql);

            HashMap<Integer, Contact> contactsById = new HashMap<>();

            //STEP 5: Extract data from result set
            while (rs.next()) {
                //Retrieve by column name
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

//                //Display values
//                System.out.print("ID: " + id);
//                System.out.print(", Age: " + email);
//                System.out.print(", First: " + first);
//                System.out.println(", Last: " + last);
//                System.out.println(", work: " + work);
            }
            //STEP 6: Clean-up environment
            rs.close();
            stmt.close();
            conn.close();
            System.out.println("Goodbye! success");
            return contactsById;
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }// nothing we can do
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");
        return null;
    }

    public boolean addEntry(Contact contact) {
        Connection conn = null;
        Statement stmt = null;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            //STEP 4: Execute a query
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
//            sql = ...
//            PreparedStatement sqlStatement = conn.prepareStatement("SELECT LAST_INSERT_ID()");
//            ResultSet rs = sqlStatement.executeQuery();
//            if (rs.next()) {
//                Id = rs.getInt(1);
//            }
//            Id ++;
            PreparedStatement sqlStatement;
            sqlStatement = conn.prepareStatement("insert into contacts (name, forename, email, mobile, work, adress, town, zip) " +
                    "values(?, ?, ?,?,?,?,?,?)");
//            sqlStatement.setInt(1, Id);
            sqlStatement.setString(1, forename);
            sqlStatement.setString(2, name);
            sqlStatement.setString(3, email);
            sqlStatement.setString(4, mobile);
            sqlStatement.setString(5, work);
            sqlStatement.setString(6, adress);
            sqlStatement.setString(7, town);
            sqlStatement.setString(8, zip);


//            "values(" + Id + "," + forename + "," + name + "," + email + "," + mobile + "," + work + "," + adress + "," + town + "," + zip + ")";
            System.out.print(sqlStatement.toString());
//            System.out.print(sql);
            Integer rs2 = sqlStatement.executeUpdate();
//            Integer rs = stmt.executeUpdate(sql);
            if (rs2 > 0) {
                System.out.println("Goodbye! success");
                return true;
            } else {
                return false;
            }
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }// nothing we can do
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");
        return false;

    }

    public boolean updateEntry(Contact contact) {
        Connection conn = null;
        Statement stmt = null;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            //STEP 4: Execute a query
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
//            sql = ...
//            PreparedStatement sqlStatement = conn.prepareStatement("SELECT LAST_INSERT_ID()");
//            ResultSet rs = sqlStatement.executeQuery();
//            if (rs.next()) {
//                Id = rs.getInt(1);
//            }
//            Id ++;
            PreparedStatement sqlStatement;
            sqlStatement = conn.prepareStatement("UPDATE contacts SET  forename= ?, name = ?, email=?, mobile=?, work=?, adress=?, town=?, zip=?  " +
                    "WHERE id = ?;");
//            sqlStatement.setInt(1, Id);
            sqlStatement.setString(1, forename);
            sqlStatement.setString(2, name);
            sqlStatement.setString(3, email);
            sqlStatement.setString(4, mobile);
            sqlStatement.setString(5, work);
            sqlStatement.setString(6, adress);
            sqlStatement.setString(7, town);
            sqlStatement.setString(8, zip);
            sqlStatement.setInt(9, Id);


//            "values(" + Id + "," + forename + "," + name + "," + email + "," + mobile + "," + work + "," + adress + "," + town + "," + zip + ")";
            System.out.print(sqlStatement.toString());
//            System.out.print(sql);
            Integer rs2 = sqlStatement.executeUpdate();
//            Integer rs = stmt.executeUpdate(sql);
            if (rs2 > 0) {
                System.out.println("Goodbye! success");
                return true;
            } else {
                return false;
            }
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }// nothing we can do
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");
        return false;

    }

    public boolean deleteEntry(Integer Id) {
        Connection conn = null;
        Statement stmt = null;
        try {

            if (Id != null) {
                //STEP 2: Register JDBC driver
                Class.forName("com.mysql.jdbc.Driver");

                //STEP 3: Open a connection
                System.out.println("Connecting to database...");
                conn = DriverManager.getConnection(DB_URL, USER, PASS);

                //STEP 4: Execute a query
                System.out.println("Creating statement...");

                stmt = conn.createStatement();
                String sql;
//            sql = ...
//            PreparedStatement sqlStatement = conn.prepareStatement("SELECT LAST_INSERT_ID()");
//            ResultSet rs = sqlStatement.executeQuery();
//            if (rs.next()) {
//                Id = rs.getInt(1);
//            }
//            Id ++;
                PreparedStatement sqlStatement;
                sqlStatement = conn.prepareStatement("DELETE FROM contacts WHERE id = ?");
                sqlStatement.setInt(1, Id);


//            "values(" + Id + "," + forename + "," + name + "," + email + "," + mobile + "," + work + "," + adress + "," + town + "," + zip + ")";
                System.out.print(sqlStatement.toString());
//            System.out.print(sql);
                Integer rs2 = sqlStatement.executeUpdate();
//            Integer rs = stmt.executeUpdate(sql);
                if (rs2 > 0) {
                    System.out.println("Goodbye! success");
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null)
                    stmt.close();
            } catch (SQLException se2) {
            }// nothing we can do
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");

        return false;
    }

    public static void main(String[] args) {
        databaseManager.getInstance().tryDBConnection();
    }

}
