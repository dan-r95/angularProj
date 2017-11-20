package adressBook;

import org.json.simple.JSONObject;

public class Contact {
    private Integer id;
    private String forename;
    private String name;
    private String zipcode;
    private String adress;
    private String town;
    private String mobile;
    private String work;
    private String email;

    public Contact() {
    }

    public Contact(Integer id, String forename, String name, String email, String mobile, String work, String adress, String town, String zip) {
        setId(id);
        setForename(forename);
        setName(name);
        setZipcode(zip);
        setAdress(adress);
        setTown(town);
        setMobile(mobile);
        setWork(work);
        setEmail(email);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getForename() {
        return forename;
    }

    public void setForename(String forename) {
        this.forename = forename;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getWork() {
        return work;
    }

    public void setWork(String work) {
        this.work = work;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId() {

    }

    public JSONObject toJson() {
        JSONObject json = new JSONObject();
        json.put("id", getId());
        json.put("name", getName());
        json.put("forename", getForename());
        json.put("email", getEmail());
        json.put("work", getWork());
        json.put("mobile", getMobile());
        json.put("adress", getAdress());
        json.put("zip", getZipcode());
        json.put("town", getTown());
        return json;

    }

    public String toJsonString() {
        JSONObject json = toJson();
        return json.toJSONString();

    }
}
