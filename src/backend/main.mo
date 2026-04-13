import Types "types/website-directory";
import WebsiteLib "lib/website-directory";
import WebsiteDirectoryApi "mixins/website-directory-api";
import List "mo:core/List";

actor {
  let websites = List.empty<Types.Website>();
  let nextId = { var count : Nat = 0 };

  WebsiteLib.seedSampleData(websites, nextId);

  include WebsiteDirectoryApi(websites, nextId);
};
