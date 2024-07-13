import Principal "mo:base/Principal";
import Time "mo:base/Time";
module {

    public type Plan = {
        #Free; // Limited to 5 posts
        #Elite; // Limited to 50 posts
        #Legendary; // Unlimited posts
    };

    public type Member = {
        name : Text;
        github : Text;
        bio : Text;
        plan : Plan;
    };

    public type PostStatus = {
        #Draft;
        #Published;
        #Archived;
    };

    public type Post = {
        id: Nat;
        title : Text;
        content: Text;
        author : Principal;
        status : PostStatus;
        createdAt : Time.Time;
        publishedAt : ?Time.Time;
    };
};