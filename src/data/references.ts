/**
 * Reference websites, taken from the two lists supplied by the site owner:
 *  - Collection A: "The 25 Best Author Websites" (blog.copyfol.io/best-author-websites)
 *  - Collection B: "The 100 Best Websites for Writers in 2021" (thewritelife.com/best-websites-for-writers-2021)
 *
 * These are OTHER PEOPLE'S websites. We only link to them (and optionally show them in a live preview
 * window loaded from their own server). Nothing from them is copied: no images, text, code or branding.
 * Literary Marketing did not build them and is not affiliated with them.
 *
 * Links come from lists published in 2021 and were not each re-tested, so a few may have moved.
 */

export type Ref = { id: string; name: string; url: string; group: "author" | "writers"; category: string; noEmbed?: boolean };

export const AUTHORS_SOURCE = "https://blog.copyfol.io/best-author-websites";
export const WRITERS_SOURCE = "https://thewritelife.com/best-websites-for-writers-2021/";

export const WRITER_CATEGORIES = [
  "Black Voices", "Blogging", "Freelancing", "Marketing", "Motivation and Productivity",
  "Newsletters", "Podcasts", "Publishing", "Writing Communities", "Writing and Editing",
] as const;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AUTHORS: [string, string][] = [
  ["Paula Hawkins", "http://paulahawkinsbooks.com/"],
  ["Charlie Mackesy", "https://www.charliemackesy.com/"],
  ["Kester Grant", "https://www.kestergrant.com/"],
  ["Victoria Aveyard", "https://victoriaaveyard.com/"],
  ["Taylor Jenkins Reid", "https://taylorjenkinsreid.com/"],
  ["Katherine Arden", "http://katherinearden.com/"],
  ["Kate Morton", "https://www.katemorton.com/"],
  ["Olivie Blake", "https://www.olivieblake.com/"],
  ["Rupi Kaur", "https://rupikaur.com/"],
  ["Katie Alender", "http://www.katiealender.com/"],
  ["James Clear", "https://jamesclear.com/"],
  ["Hafsah Faizal (We Hunt the Flame)", "https://www.wehunttheflame.com/"],
  ["Veronica Roth", "https://veronicarothbooks.com/"],
  ["Scarlett St. Clair", "https://www.scarlettstclair.com/books"],
  ["J. Daniels", "https://authorjdaniels.com/"],
  ["Emma Davies", "https://www.emmadaviesauthor.com/"],
  ["Kami Garcia", "https://kamigarcia.com/"],
  ["E. L. James", "https://www.eljamesauthor.com/"],
  ["Genevieve Gornichec", "https://genevievegornichec.com/"],
  ["David Sedaris", "https://www.davidsedarisbooks.com/"],
  ["Kasey Edwards", "https://www.kaseyedwards.com/"],
  ["Adam Silvera", "http://www.adamsilvera.com/"],
  ["Casey McQuiston", "https://caseymcquiston.com/"],
  ["Brené Brown", "https://brenebrown.com/"],
  ["Hannah Kent", "http://hannahkentauthor.com/"],
];

const WRITERS: Record<(typeof WRITER_CATEGORIES)[number], [string, string][]> = {
  "Black Voices": [
    ["Black Freelance", "https://blackfreelance.com/"],
    ["Danielle the Writer", "https://daniellethewriter.com/"],
    ["The Freelance Beat", "https://www.thefreelancebeat.com/"],
    ["Inkwell Editorial", "https://inkwelleditorial.com/"],
    ["OnlineDrea", "https://onlinedrea.com/"],
    ["See Jane Write", "https://seejanewritebham.com/"],
  ],
  Blogging: [
    ["Be a Freelance Blogger", "https://beafreelanceblogger.com/"],
    ["Copyblogger", "https://copyblogger.com/"],
    ["How to Blog a Book", "https://howtoblogabook.com/"],
    ["ProBlogger", "https://www.problogger.net/"],
    ["The Blogsmith", "https://www.the-blogsmith.com/"],
  ],
  Freelancing: [
    ["A Selfish Poet", "https://trishhopkinson.com/"],
    ["Elna Cain", "https://elnacain.com/"],
    ["Freelance to Freedom", "https://freelancetofreedomproject.com/"],
    ["Kat Boogaard", "https://katboogaard.com/"],
    ["Make a Living Writing", "https://makealivingwriting.com/"],
    ["The Freelancer by Contently", "https://contently.net/"],
    ["The Freelancer's Year", "https://www.thefreelancersyear.com/"],
    ["The Quiet Type", "https://thequiettypeblog.com/"],
    ["Wanderful World", "https://wanderful-world.com/"],
    ["Sarah Turner", "https://officialsarahturner.com/"],
  ],
  Marketing: [
    ["Bakerview Consulting", "https://bakerviewconsulting.com/blog/"],
    ["Build Book Buzz", "https://buildbookbuzz.com/"],
    ["Content Marketing Institute", "https://contentmarketinginstitute.com/"],
    ["Ginny Carter", "https://marketingtwentyone.co.uk/about-ginny-carter/"],
    ["Nessgraphica", "https://www.nessgraphica.com/"],
    ["Nicole Bianchi", "https://nicolebianchi.com/"],
    ["The Creative Penn", "https://www.thecreativepenn.com/"],
    ["Robyn Roste", "https://robynroste.com/"],
  ],
  "Motivation and Productivity": [
    ["Ashley Gainer", "https://ashleygainer.com/"],
    ["Books & Alchemy", "https://www.booksandalchemy.com/"],
    ["Leigh Shulman", "https://leighshulman.com/"],
    ["Positive Writer", "https://positivewriter.com/"],
    ["The Novel Smithy", "https://thenovelsmithy.com/"],
    ["The Write Conversation", "https://thewriteconversation.blogspot.com/"],
    ["The Write Practice", "https://thewritepractice.com/"],
    ["Writers in the Storm", "https://writersinthestormblog.com/"],
    ["Writing Forward", "https://www.writingforward.com/"],
  ],
  Newsletters: [
    ["FundsforWriters", "https://fundsforwriters.com/"],
    ["Jacob McMillen", "https://jacobmcmillen.com/"],
    ["Notes Newsletter", "https://danasitar.com/"],
    ["The Ambitious Writer", "https://theambitiouswriter.substack.com/"],
    ["The Bookfox Club", "https://thejohnfox.com/"],
    ["Wylie's Writing Tips", "https://www.wyliecomm.com/"],
    ["Writers' HQ", "https://writershq.co.uk/"],
  ],
  Podcasts: [
    ["AskAlli: Self-Publishing Advice Podcast", "https://selfpublishingadvice.org/"],
    ["Ann Kroeker, Writing Coach", "https://annkroeker.com/"],
    ["The Honest Authors Podcast", "https://hollyseddon.com/about-me/the-honest-authors-podcast/"],
    ["How Do You Write", "https://www.howdoyouwrite.net/"],
    ["Indie Author Weekly", "https://saganmorrow.com/"],
    ["Marion Roach Smith", "https://marionroach.com/"],
    ["Savannah Gilbo's Fiction Writing Made Easy", "https://www.savannahgilbo.com/podcast"],
    ["The Bestseller Experiment", "https://bestsellerexperiment.com/"],
    ["Travel Writing World Podcast", "https://www.travelwritingworld.com/"],
    ["Writing Excuses", "https://writingexcuses.com/"],
  ],
  Publishing: [
    ["Anne R. Allen's Blog with Ruth Harris", "https://annerallen.com/"],
    ["Career Authors", "https://careerauthors.com/"],
    ["Creativindie", "https://www.creativindie.com/"],
    ["Jane Friedman", "https://janefriedman.com/"],
    ["Kindlepreneur", "https://kindlepreneur.com/blog"],
    ["Paperback Kingdom", "https://paperbackkingdom.com/"],
    ["Self Publishing Formula", "https://selfpublishingformula.com/"],
    ["Well-Storied", "https://www.well-storied.com/"],
    ["Writer Beware", "https://writerbeware.blog/"],
    ["Writer's Relief", "https://writersrelief.com/"],
    ["Self-Publishing School", "https://self-publishingschool.com"],
  ],
  "Writing Communities": [
    ["Alessandra Torre Ink", "https://www.alessandratorreink.com/"],
    ["Ask A Book Editor (Facebook group)", "https://www.facebook.com/groups/1754530731241951"],
    ["Chronicles", "https://www.sffchronicles.com/"],
    ["Faith Writers", "https://faithwriters.com/"],
    ["Fiction Writing (Facebook group)", "https://www.facebook.com/groups/611602735649133/"],
    ["Inner Circle Writers' Group (Facebook group)", "https://www.facebook.com/groups/innercirclewritersgroup"],
    ["Insecure Writer's Support Group", "https://www.insecurewriterssupportgroup.com/"],
    ["Scribophile", "https://www.scribophile.com/"],
    ["The Masters Review", "https://mastersreview.com/"],
  ],
  "Writing and Editing": [
    ["Abbie Emmons", "https://www.abbiee.com/"],
    ["Bang2Write", "https://www.bang2write.com/"],
    ["Copywrite Matters", "https://copywritematters.com/"],
    ["C.S. Lakin's Live Write Thrive", "https://www.livewritethrive.com/"],
    ["DIY MFA", "https://diymfa.com/"],
    ["Elizabeth Spann Craig", "https://elizabethspanncraig.com/blog-3/"],
    ["Helping Writers Become Authors", "https://www.helpingwritersbecomeauthors.com/"],
    ["Horror Tree", "https://horrortree.com/"],
    ["Jane Austen Writing Lessons", "https://www.katherinecowley.com/jawl/"],
    ["Jerry Jenkins", "https://jerryjenkins.com/"],
    ["Kathy Steinemann", "https://kathysteinemann.com/Musings/"],
    ["Kiingo Writing Tips", "https://kiingo.com/tips"],
    ["Kingdom Pen", "https://kingdompen.org/"],
    ["One Stop for Writers", "https://onestopforwriters.com/"],
    ["Perfect English Grammar", "https://www.perfect-english-grammar.com/"],
    ["Pitch Travel Write", "https://www.pitchtravelwrite.com/"],
    ["ProWritingAid", "https://prowritingaid.com/"],
    ["Quick and Dirty Tips (Grammar Girl)", "https://www.quickanddirtytips.com/grammar-girl"],
    ["Script Advice", "https://www.scriptadvice.co.uk/"],
    ["The History Quill", "https://thehistoryquill.com/"],
    ["The Porte Port", "https://www.theporteport.com/blog"],
    ["Where to Pitch", "https://wheretopitch.com/"],
    ["Word Wise Tips", "https://www.nonprofitcopywriter.com/"],
    ["Writer Unboxed", "https://writerunboxed.com/"],
    ["Writers Write", "https://writerswrite.co.za/"],
  ],
};

const noEmbed = (url: string) => /facebook\.com/.test(url);

export const AUTHOR_REFS: Ref[] = AUTHORS.map(([name, url]) => ({ id: `a-${slug(name)}`, name, url, group: "author", category: "Author website", noEmbed: noEmbed(url) }));

export const WRITER_REFS: Ref[] = WRITER_CATEGORIES.flatMap((category) =>
  WRITERS[category].map(([name, url]) => ({ id: `w-${slug(name)}`, name, url, group: "writers" as const, category, noEmbed: noEmbed(url) })),
);

/** Live preview loads the site over HTTPS (browsers block http pages inside an https page). */
export const previewUrl = (url: string) => url.replace(/^http:\/\//, "https://");
