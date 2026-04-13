import Types "../types/website-directory";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Text "mo:core/Text";

module {
  public type Website = Types.Website;
  public type WebsiteId = Types.WebsiteId;

  public func seedSampleData(websites : List.List<Website>, nextId : { var count : Nat }) {
    if (websites.size() > 0) return;

    let samples : [(Text, Text, Text, Text, [Text])] = [
      ("GitHub", "World's leading software development platform", "https://github.com", "Tech", ["code", "git", "open-source"]),
      ("Stack Overflow", "Q&A platform for programmers", "https://stackoverflow.com", "Tech", ["programming", "qa", "developers"]),
      ("Healthline", "Medical information and health advice", "https://healthline.com", "Health", ["medicine", "wellness", "health"]),
      ("WebMD", "Health information and medical news", "https://webmd.com", "Health", ["medical", "symptoms", "health"]),
      ("Coursera", "Online courses from top universities", "https://coursera.org", "Education", ["courses", "learning", "university"]),
      ("Khan Academy", "Free educational resources for all ages", "https://khanacademy.org", "Education", ["free", "learning", "kids"]),
      ("Amazon India", "India's largest online shopping store", "https://amazon.in", "E-commerce", ["shopping", "deals", "india"]),
      ("Flipkart", "Indian e-commerce marketplace", "https://flipkart.com", "E-commerce", ["shopping", "india", "deals"]),
      ("BBC News", "Breaking news and world news coverage", "https://bbc.com", "News", ["news", "world", "breaking"]),
      ("NDTV", "India's top news channel and website", "https://ndtv.com", "News", ["india", "news", "breaking"]),
    ];

    let now = Time.now();
    for ((name, description, url, category, tags) in samples.values()) {
      let id = nextId.count;
      nextId.count += 1;
      websites.add({
        id;
        name;
        description;
        url;
        category;
        tags;
        submittedAt = now;
      });
    };
  };

  public func searchWebsites(
    websites : List.List<Website>,
    searchTerm : Text,
    category : ?Text,
  ) : [Website] {
    let lowerTerm = searchTerm.toLower();
    let filtered = websites.filter(func(w : Website) : Bool {
      let matchesSearch = searchTerm == "" or
        w.name.toLower().contains(#text lowerTerm) or
        w.description.toLower().contains(#text lowerTerm) or
        w.url.toLower().contains(#text lowerTerm);
      let matchesCategory = switch (category) {
        case null true;
        case (?cat) w.category.toLower() == cat.toLower();
      };
      matchesSearch and matchesCategory;
    });
    filtered.toArray();
  };

  public func getAllWebsites(websites : List.List<Website>) : [Website] {
    websites.toArray();
  };

  public func getWebsiteById(websites : List.List<Website>, id : WebsiteId) : ?Website {
    websites.find(func(w : Website) : Bool { w.id == id });
  };

  public func submitWebsite(
    websites : List.List<Website>,
    nextId : { var count : Nat },
    name : Text,
    description : Text,
    url : Text,
    category : Text,
    tags : [Text],
  ) : Website {
    let id = nextId.count;
    nextId.count += 1;
    let website : Website = {
      id;
      name;
      description;
      url;
      category;
      tags;
      submittedAt = Time.now();
    };
    websites.add(website);
    website;
  };

  public func getCategories(websites : List.List<Website>) : [Text] {
    let seen = Set.empty<Text>();
    websites.forEach(func(w : Website) {
      seen.add(w.category);
    });
    seen.toArray();
  };
};
