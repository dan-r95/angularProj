package adressBook;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ContactManager {

    private HashMap<Integer, Contact> cachedContacts = null;

    private static final ContactManager instance = new ContactManager();

    public static ContactManager getInstance() {
        return instance;
    }

    private ContactManager() {
    }

    public Contact getContact(Integer id) {
        if (cachedContacts != null) {
            Contact contact = cachedContacts.get(id);
            if (contact != null) {
                return contact;
            }

        } else {
            cachedContacts = DatabaseManager.getInstance().tryDBConnection();
            Contact contact = cachedContacts.get(id);
            if (contact != null) {
                return contact;
            }
        }
        return null;
    }

    public Collection<Contact> getAllContacts() {
        if (cachedContacts != null) {
            return cachedContacts.values(); // (Contact[]) .toArray();

        } else {
            cachedContacts = DatabaseManager.getInstance().tryDBConnection();
            if (cachedContacts != null) {
                return cachedContacts.values(); // (Contact[]) .toArray();
            }
        }
        return null;
    }

    public boolean refreshCache() {
        cachedContacts = DatabaseManager.getInstance().tryDBConnection();
        if (cachedContacts != null) {
            return true;
        }
        return false;
    }

    public Integer addContact(Contact contact) {
        Integer completed = DatabaseManager.getInstance().addEntry(contact);
        cachedContacts = DatabaseManager.getInstance().tryDBConnection();
        return completed;
    }

    public boolean updateContact(Contact contact) {
        boolean completed = DatabaseManager.getInstance().updateEntry(contact);
        cachedContacts = DatabaseManager.getInstance().tryDBConnection();
        return completed;
    }

    public boolean deleteContact(Integer id) {
        boolean completed = DatabaseManager.getInstance().deleteEntry(id);
        cachedContacts = DatabaseManager.getInstance().tryDBConnection();
        return completed;
    }

    public boolean deleteAllContacts() {
        boolean completed = DatabaseManager.getInstance().deleteAll();
        cachedContacts = DatabaseManager.getInstance().tryDBConnection();
        return completed;
    }

    /**
     * for complexity's sake - just look for matches in forename and name
     *
     * @param ss
     * @return
     */
    public List<Contact> searchForContact(String ss) {
        // just search the cache, not the DB
        if (cachedContacts != null) {
            final String searchString = ss.toLowerCase();
            Stream<Contact> stream = cachedContacts.values().stream()
                    .filter(e -> e.getName().toLowerCase().contains(searchString)
                            || e.getForename().toLowerCase().contains(searchString));
            List<Contact> list = stream.collect(Collectors.toList());
            return list;

        }
        return null;
    }

}
