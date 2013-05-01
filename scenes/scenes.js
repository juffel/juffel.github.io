var start = new Scene("start", "Eventually its gonna be a textadventure!");
start.setDescription("Begin? Or Credits?");
start.addOption(["begin", "start"], "begin");
start.addOption(["credits", "credits"], "credits");

var credits = new Scene("credits", ["CREDITS"]);
credits.setDescription("+++ juffel +++");
credits.addOption(["begin", "start"], "begin");

var sc = new Scene("begin", "IN THE BEGINNING");
sc.setDescription("The Story begins. You are sitting on a backless chair and feel the intense pain of not knowing.");
sc.addOption(["Stand", "Up", "Get"], "standing");

var sc03i = new Scene("standing", "UP IN THE AIR");
sc03i.setDescription("From up here everything looks different. You focus on some details in the painting on the bulldozer in front of you.");

var end = new Scene("end", "THIS IS THE END");
end.setDescription("And then they lived happily ever after.");

var sceneList = [start, credits, sc, sc03i, end];
