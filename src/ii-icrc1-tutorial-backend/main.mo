import Result "mo:base/Result";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Types "types";
import Vector "mo:vector";


actor Blog {

  type Result<A, B> = Result.Result<A, B>;
  type Member = Types.Member;
  type Plan = Types.Plan;
  type Post = Types.Post;
  type PostStatus = Types.PostStatus;
  type Vector<T> = Vector.Vector<T>;

  stable let name = "Blog Dapp";
  stable var manifesto = "A simple blog dapp";

  stable var stableMembers : [(Principal, Member)] = [];
  let members = HashMap.fromIter<Principal, Member>(stableMembers.vals(), 0, Principal.equal, Principal.hash);

  stable var stablePosts: [(Principal, Vector<Post>)] = [];
  let posts = HashMap.fromIter<Principal, Vector<Post>>(stablePosts.vals(), 0, Principal.equal, Principal.hash);

  public query func getName() : async Text {
    return name;
  };

  public query func getManifesto() : async Text {
    return manifesto;
  };

  public query func getMembers() : async [(Principal, Member)] {
    Iter.toArray(members.entries());
  };

  public query func getPosts() : async [Post] {
    let vec = Vector.new<Post>();
    for (post in posts.vals()) {
      Vector.addFromIter<Post>(vec, Vector.vals<Post>(post));
    };
    Vector.toArray<Post>(vec);
  };

  public query func getMemberProfile(p : Principal) : async Result<Member, Text> {
    switch (members.get(p)) {
      case null {
        return #err("User not found");
      };
      case (?member) {
        #ok(member);
      };
    };
  };

  public query func getMemberPosts(p : Principal) : async Result<[Post], Text> {
    switch (posts.get(p)) {
      case null {
        return #err("User not found");
      };
      case (?post) {
        #ok(Vector.toArray<Post>(post));
      };
    };
  };

  public shared ({ caller }) func register(member : Member) : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {
        let member = {
          name = name;
          role = #Student;
          github = github;
        };
        members.put(caller, member);
        await Token.mint(caller, 10);
      };
      case (_) {
        return #err("Member already exist");
      };
    };
  };
};
