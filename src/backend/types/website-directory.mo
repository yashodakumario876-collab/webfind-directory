module {
  public type WebsiteId = Nat;

  public type Website = {
    id : WebsiteId;
    name : Text;
    description : Text;
    url : Text;
    category : Text;
    tags : [Text];
    submittedAt : Int;
  };
};
