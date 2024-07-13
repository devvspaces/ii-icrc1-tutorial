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

  stable var stablePosts : [(Principal, Vector<Post>)] = [];
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

  public shared ({ caller }) func register(name : Text, github : Text, bio : Text) : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {
        let member = {
          name = name;
          bio = bio;
          github = github;
          plan = #Free;
        };
        members.put(caller, member);
        return #ok();
      };
      case (_) {
        return #err("Member already exists");
      };
    };
  };

  public shared ({ caller }) func createPost(title : Text, content : Text, status : PostStatus) : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {
        return #err("Member not found");
      };
      case (?member) {
        switch (posts.get(caller)) {
          case (null) {
            posts.put(caller, Vector.new<Post>());
          };
          case (_) {};
        };
        switch (posts.get(caller)) {
          case (null) {};
          case (?postsObj) {
            let postCount = Vector.size<Post>(postsObj);
            switch (member.plan) {
              case (#Free) {
                if (postCount >= 5) {
                  return #err("Free plan is limited to 5 posts");
                };
              };
              case (#Elite) {
                if (postCount >= 50) {
                  return #err("Elite plan is limited to 50 posts");
                };
              };
              case (#Legendary) {};
            };

            if (status == #Published) {
              Vector.add<Post>(
                postsObj,
                {
                  id = postCount;
                  title = title;
                  content = content;
                  author = caller;
                  status = status;
                  createdAt = Time.now();
                  publishedAt = ?Time.now();
                },
              );
            } else {
              Vector.add<Post>(
                postsObj,
                {
                  id = postCount;
                  title = title;
                  content = content;
                  author = caller;
                  status = status;
                  createdAt = Time.now();
                  publishedAt = null;
                },
              );
            };
          };
        };
        return #ok();
      };
    };
  };

  public query func getPost(id : Nat, owner : Principal) : async Result<Post, Text> {
    switch (posts.get(owner)) {
      case null {
        return #err("Post not found");
      };
      case (?postsObj) {
        if (id >= Vector.size<Post>(postsObj)) {
          return #err("Post not found");
        };
        return #ok(Vector.get<Post>(postsObj, id));
      };
    };
  };

  public shared ({ caller }) func updatePostStatus(id : Nat, status : PostStatus) : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {
        return #err("Member not found");
      };
      case (?member) {
        switch (posts.get(caller)) {
          case (null) {
            return #err("Post not found");
          };
          case (?postsObj) {
            if (id >= Vector.size<Post>(postsObj)) {
              return #err("Post not found");
            };
            let post = Vector.get<Post>(postsObj, id);
            let updatedPost = {
              id = post.id;
              title = post.title;
              content = post.content;
              author = post.author;
              status = status;
              createdAt = post.createdAt;
              publishedAt = post.publishedAt;
            };
            Vector.put<Post>(postsObj, id, updatedPost);
            return #ok();
          };
        };
      };
    };
  };

  public query func getPlans() : async [Plan] {
    [#Free, #Elite, #Legendary];
  };

  private func _getPlanCost(plan : Plan) : Nat {
    switch (plan) {
      case (#Free) {
        0;
      };
      case (#Elite) {
        10;
      };
      case (#Legendary) {
        20;
      };
    };
  };

  private func _updatePlan(caller : Principal, plan : Plan) : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {
        return #err("Member not found");
      };
      case (?member) {
        let updatedMember = {
          name = member.name;
          bio = member.bio;
          github = member.github;
          plan = plan;
        };
        members.put(caller, updatedMember);
        return #ok();
      };
    };
  };
};
