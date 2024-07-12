import Principal "mo:base/Principal";
import Time "mo:base/Time";
module {

    public type Plan = {
        #Free;
        #Elite;
        #Legendary;
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
        title : Text;
        content: Text;
        author : Principal;
        status : PostStatus;
        publishedAt : Time.Time;
    };
};