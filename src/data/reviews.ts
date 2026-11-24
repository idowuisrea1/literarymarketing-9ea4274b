/**
 * CUSTOMER REVIEWS: the single source of truth for review notifications.
 *
 * To add a review, add one object to REVIEWS. No component needs to change.
 * Keep the customer's name, rating and wording exactly as supplied.
 * `excerpt` is optional: if left out, a short excerpt is generated automatically for the popup.
 * The complete `review` text is always kept and is shown when a visitor taps "Read full review".
 */

export type ReviewGroup =
  | "website"
  | "author-marketing"
  | "marketplace"
  | "publishing"
  | "branding"
  | "experience"
  | "premium";

export const REVIEW_CATEGORIES: Record<ReviewGroup, string> = {
  website: "Website Design & Development",
  "author-marketing": "Author Websites & Book Marketing",
  marketplace: "Marketplace Website Development",
  publishing: "Book Formatting, Editing & Publishing",
  branding: "Branding, Creativity & Business Growth",
  experience: "Overall Customer Experience",
  premium: "Premium Testimonials",
};

export type ReviewRecord = {
  id: string;
  name: string;
  category: ReviewGroup;
  rating: number;
  review: string;
  excerpt?: string;
};

/**
 * Set to true ONLY when every review below is backed by genuine customer records.
 * While false, review popups carry a "Sample testimonial" badge instead of "Verified".
 */
export const REVIEWS_VERIFIED = false;

export const REVIEWS: ReviewRecord[] = [
  /* Website Design & Development */
  { id: "rev-001", name: "Olivia Bennett", category: "website", rating: 5, review: "The website looks absolutely incredible. The design was professional, modern, and exactly what I had envisioned. Communication was excellent, and the final result exceeded my expectations." },
  { id: "rev-002", name: "Daniel Brooks", category: "website", rating: 5, review: "I needed a professional website that would make my business stand out. The entire experience was smooth, and the attention to detail was outstanding." },
  { id: "rev-003", name: "Sophia Mitchell", category: "website", rating: 5, review: "From the first conversation to the final delivery, everything was handled professionally. My website now looks premium, works beautifully, and represents my brand perfectly." },
  { id: "rev-004", name: "James Carter", category: "website", rating: 5, review: "Excellent work! The website is responsive, visually appealing, and easy to navigate. I especially appreciate the creativity and dedication put into the project." },
  { id: "rev-005", name: "Emily Richardson", category: "website", rating: 5, review: "I had a vision but didn't know how to bring it to life. The final website captured everything I wanted and even included improvements I hadn't considered." },

  /* Author Websites & Book Marketing */
  { id: "rev-006", name: "Charlotte Evans", category: "author-marketing", rating: 5, review: "My author website finally reflects the quality of my books. The layout, presentation, and overall branding make my work look much more professional." },
  { id: "rev-007", name: "Michael Anderson", category: "author-marketing", rating: 5, review: "I wanted a website where readers could explore my books and connect with me. The result was beautiful, organized, and reader-friendly." },
  { id: "rev-008", name: "Isabella Thompson", category: "author-marketing", rating: 5, review: "The book presentation was fantastic. Every detail, from the cover displays to the layout, made my author brand feel more established." },
  { id: "rev-009", name: "Benjamin Foster", category: "author-marketing", rating: 5, review: "I appreciated the understanding of the publishing industry. The marketing ideas were thoughtful, practical, and focused on attracting the right readers." },
  { id: "rev-010", name: "Amelia Parker", category: "author-marketing", rating: 5, review: "My book collection now has a professional online home. The website makes it easier for visitors to discover my titles and learn about my writing." },

  /* Marketplace Website Development */
  { id: "rev-011", name: "William Harris", category: "marketplace", rating: 5, review: "The marketplace website turned out better than expected. The vendor dashboard, product pages, and overall structure made the platform feel like a real business." },
  { id: "rev-012", name: "Grace Wilson", category: "marketplace", rating: 5, review: "I needed a multi-vendor marketplace, and the result was impressive. The design is clean, the navigation is intuitive, and the vendor experience is well organized." },
  { id: "rev-013", name: "Ethan Moore", category: "marketplace", rating: 5, review: "The attention to functionality was what impressed me most. It wasn't just about making the website look good; the features were carefully considered too." },
  { id: "rev-014", name: "Victoria Lewis", category: "marketplace", rating: 5, review: "A fantastic experience! The marketplace design looks professional, and the vendor management features give the platform a solid foundation." },
  { id: "rev-015", name: "Alexander Young", category: "marketplace", rating: 5, review: "I now have a marketplace website that gives my business a much stronger online presence. Great creativity, communication, and execution." },

  /* Book Formatting, Editing & Publishing */
  { id: "rev-016", name: "Natalie Cooper", category: "publishing", rating: 5, review: "The formatting was clean and professional. My manuscript now looks polished and ready for readers. I really appreciated the careful attention to detail." },
  { id: "rev-017", name: "Christopher Hall", category: "publishing", rating: 5, review: "The editing support helped bring more clarity and structure to my manuscript. The work was handled with professionalism and care." },
  { id: "rev-018", name: "Hannah Scott", category: "publishing", rating: 5, review: "I was impressed by the quality of the formatting and the presentation of my book. Everything looked organized and professionally prepared." },
  { id: "rev-019", name: "Matthew Green", category: "publishing", rating: 5, review: "The publishing preparation process was much easier than I expected. The guidance and attention given to the project made a real difference." },
  { id: "rev-020", name: "Zoe Adams", category: "publishing", rating: 5, review: "My manuscript received the professional touch it needed. I am very pleased with the final presentation and overall experience." },

  /* Branding, Creativity & Business Growth */
  { id: "rev-021", name: "Lucas Martin", category: "branding", rating: 5, review: "The creativity and professionalism were outstanding. My brand now has a much clearer identity, and the visual presentation feels consistent." },
  { id: "rev-022", name: "Abigail Turner", category: "branding", rating: 5, review: "I loved the entire process. Every suggestion was thoughtful, and the final result gave my business the polished appearance I was looking for." },
  { id: "rev-023", name: "David Phillips", category: "branding", rating: 5, review: "Very professional service. The communication was clear, the ideas were creative, and the delivery was handled with great attention." },
  { id: "rev-024", name: "Madison Clark", category: "branding", rating: 5, review: "The work showed a genuine understanding of what I wanted to achieve. I am particularly impressed by the quality and attention to detail." },
  { id: "rev-025", name: "Ryan Mitchell", category: "branding", rating: 5, review: "A great experience from beginning to end. The project was approached strategically, and the final outcome was exactly what my business needed." },

  /* Overall Customer Experience */
  { id: "rev-026", name: "Elizabeth Ward", category: "experience", rating: 5, review: "Professional, creative, and reliable. I felt listened to throughout the project, and the final delivery reflected the original vision beautifully." },
  { id: "rev-027", name: "Nathan Roberts", category: "experience", rating: 5, review: "What stood out was the dedication to quality. Every part of the project received attention, and the communication was consistently helpful." },
  { id: "rev-028", name: "Lily Morgan", category: "experience", rating: 5, review: "I would definitely recommend this service to anyone looking for professional digital solutions. The experience was straightforward and enjoyable." },
  { id: "rev-029", name: "Samuel Baker", category: "experience", rating: 5, review: "The quality of work was excellent, and the process was well organized. I appreciated the willingness to understand my goals before starting." },
  { id: "rev-030", name: "Audrey Collins", category: "experience", rating: 5, review: "A wonderful experience overall. The creativity, professionalism, and attention to detail made this project worthwhile." },

  /* Premium Testimonials */
  { id: "rev-031", name: "Jonathan Reed", category: "premium", rating: 5, review: "The result was more than just a website. It gave my business a professional digital identity and a better way to present my services." },
  { id: "rev-032", name: "Claire Bennett", category: "premium", rating: 5, review: "I appreciated the combination of creativity and strategy. Everything felt intentional, from the visual design to the user experience." },
  { id: "rev-033", name: "Aaron Mitchell", category: "premium", rating: 5, review: "Excellent attention to detail and a strong understanding of modern website design. The final result was polished and professional." },
  { id: "rev-034", name: "Rebecca James", category: "premium", rating: 5, review: "The project was handled with care, and the communication made everything easy. I am very happy with the quality of the work." },
  { id: "rev-035", name: "Daniela Foster", category: "premium", rating: 5, review: "A truly professional experience. The design, structure, and overall presentation were impressive. I would happily work together again." },
];
