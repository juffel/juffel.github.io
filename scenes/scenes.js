var start = new Scene("start", "Eventually its gonna be a textadventure!");
start.setDescription("Begin? Or Credits?");
start.addOption(["begin", "start"], "begin");
start.addOption(["credits", "credits"], "credits");

var credits = new Scene("credits", ["CREDITS"]);
credits.setDescription("+++ juffel +++");
credits.addOption(["begin", "start"], "begin");

var begin = new Scene("begin", "IN THE BEGINNING");
begin.setDescription("The Story begins. You are sitting on a backless chair and feel the intense pain of not knowing.");
begin.addOption(["Stand", "Up", "Get"], "standing");
begin.addOption(["concentrate", "think", "remember"], "mind");
begin.addOption(["close", "eye", "eyes", "blind"], "darkness");
begin.addOption(["lean", "back"], "ceiling");

var standing = new Scene("standing", "UP IN THE AIR");
standing.setDescription("From up here everything looks different. You focus on some details in the painting on the bulldozer in front of you.");
standing.addOption(["sit", "down", "floor", "chair"], "begin");
standing.addOption(["painting", "look", "focus"], "painting");
standing.addOption(["bulldozer", "enter"], "bulldozer");

var bulldozer = new Scene("bulldozer", "DEVASTATION");
bulldozer.setDescription("Your newly gained power seems to raise you some kilometres in the direction of the unreachable stars. The chair in front of you embodies a poorly protected victim.");
bulldozer.addOption(["crush", "smash", "chair", "flat", "flatten", "destroy"], "antisofa");

var antisofa = new Scene("antisofa", "ANTISOFA");
antisofa.setDescription("All comfort vanished from planet earth. It is almost as if you overran the natural comfortability-equilibrium. The existence of an dairy antisofa is standing to reason.");

var painting = new Scene("painting", "THE ISLE OF FAT");
painting.setDescription("Something feels odd about this painting. Beneath it's greasy surface it would seem that it tasted like a walk through one of those warm summer nights, which follow the first days of summer.");
painting.addOption(["lick"], "gustation");
painting.addOption(["go", "for", "walk"], "walk");

var gustation = new Scene("gustation", "GUSTATION");

var walk = new Scene("walk", "PROMENADE");

var mind = new Scene("mind", "INSIDE YOUR BRAIN");
mind.setDescription("It is warm and gooey in here. That golden thread that got you here will weaken with any further second you spend in here. And also the End is near! The clue to solving this situation is nominalization.");
mind.addOption(["solution"], "end");

var darkness = new Scene("darkness", "DARKNESS");
darkness.setDescription("The visual world around you consists just of a thick, heavy black shadow, that seems to consume your whole imagination. Maybe you should cause some distraction.");
darkness.addOption(["open", "eyes", "look"], "begin");

var end = new Scene("end", "THIS IS THE END");
end.setDescription("And then they lived happily ever after.");

var sceneList = [start, credits, begin, standing, mind, darkness, painting, gustation, walk, bulldozer, antisofa, end];
