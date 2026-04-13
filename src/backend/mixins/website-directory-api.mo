import Types "../types/website-directory";
import WebsiteLib "../lib/website-directory";
import List "mo:core/List";

mixin (
  websites : List.List<Types.Website>,
  nextId : { var count : Nat },
) {

  public query func searchWebsites(searchTerm : Text, category : ?Text) : async [Types.Website] {
    WebsiteLib.searchWebsites(websites, searchTerm, category);
  };

  public query func getAllWebsites() : async [Types.Website] {
    WebsiteLib.getAllWebsites(websites);
  };

  public query func getWebsiteById(id : Types.WebsiteId) : async ?Types.Website {
    WebsiteLib.getWebsiteById(websites, id);
  };

  public func submitWebsite(
    name : Text,
    description : Text,
    url : Text,
    category : Text,
    tags : [Text],
  ) : async Types.Website {
    WebsiteLib.submitWebsite(websites, nextId, name, description, url, category, tags);
  };

  public query func getCategories() : async [Text] {
    WebsiteLib.getCategories(websites);
  };
};
