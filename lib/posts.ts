export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
};

export const posts: Post[] = [
  {
    slug: "building-ai-movie-studio",
    title: "Building an AI Movie Studio: Architectural Decisions",
    excerpt:
      "How I designed a storyboard-first pipeline to keep AI generation costs low while building my thesis project SaaS platform.",
    date: "2025-03-12",
    readTime: "8 min",
    tags: ["Architecture", "Spring Boot", "AI", "Java"],
    content: `
When I started building my AI Movie Studio thesis project, I made one architectural decision that shaped everything else: **the storyboard-first pipeline**.

## The problem

AI video generation is expensive. A single 5-second clip can cost $0.50–$2.00 depending on the model. If a user wants to iterate on a 10-scene movie, naively generating videos for every change could burn through hundreds of dollars before they're satisfied with the result.

## The solution

Split the pipeline into cheap and expensive phases:

1. **Characters** — Generate consistent character references (cheap)
2. **Script** — LLM-generated screenplay (very cheap)
3. **Scenes** — Break script into scene descriptions (very cheap)
4. **Storyboard** — Generate keyframes per scene (moderate cost)
5. **Video** — Only after storyboard approval, generate videos (expensive)
6. **Final Movie** — FFmpeg assembly (free, server-side)

By the time the user reaches the video generation step, they've already approved every visual decision. The expensive step happens once.

## Backend stack

- **Java 21 + Spring Boot** — solid foundation, great for domain modeling
- **MySQL + Flyway** — reliable, predictable migrations
- **JWT auth** — stateless, scales horizontally
- **AWS S3** — for image and video storage
- **OpenAI + xAI APIs** — split based on capability and cost

## What I learned

The biggest insight was separating **client-facing APIs** from **internal AI pipeline operations**. The user-facing API never directly invokes AI providers — it queues a job, returns immediately, and a worker handles the actual generation. This keeps the API responsive and lets me retry, throttle, and route to different providers without changing the client.

If you're building something similar, start with the cost model. Architecture follows economics.
    `,
  },
  {
    slug: "accountant-to-developer",
    title: "From Accountant to Developer: My Career Transition",
    excerpt:
      "Why I left a stable career in accounting to become a fullstack developer — and how my finance background made me a better engineer.",
    date: "2025-02-20",
    readTime: "5 min",
    tags: ["Career", "Personal"],
    content: `
For six years I worked as an accounting economist. Bookkeeping, VAT, tax declarations, financial audits. It was stable, well-paid, and predictable.

Then I quit.

## Why I left

I kept finding myself building little tools — Excel macros, automation scripts, custom dashboards. The actual accounting was fine, but the **building** was what made me come alive. Eventually it became impossible to ignore.

## What surprised me

I expected the technical learning curve to be the hard part. It wasn't. The hard part was unlearning a particular way of thinking — accounting prizes precision and conformity, and rewards you for following rules exactly. Software engineering rewards the opposite: figuring out which rules to break, what to abstract, what to leave messy.

## What carried over

Three things from accounting turned out to be huge advantages in software:

1. **Reading documentation carefully** — accountants live in tax codes. Reading API docs is easier than reading the Swedish tax code.
2. **Understanding business processes** — when a stakeholder describes a workflow, I can usually map it to a domain model in my head before they finish.
3. **Being comfortable with uncertainty** — every audit involves working with incomplete information. So does every debugging session.

## Where I am now

Three years into the transition: a fullstack role at Swedcon, an internship at Nobicon, and now a Java Systems Developer degree. The pivot was the right call.

If you're considering a similar move — your previous career is not wasted experience. It's leverage.
    `,
  },
  {
    slug: "recursive-cte-mysql",
    title: "Recursive CTE Queries: Hierarchical Data in MySQL",
    excerpt:
      "How I used recursive Common Table Expressions to query nested profile trees during my Nobicon internship — and why CTEs beat the alternatives.",
    date: "2025-01-08",
    readTime: "6 min",
    tags: ["MySQL", "SQL", "Backend"],
    content: `
While building the Awareness statistics dashboard at Nobicon, I needed to query a deeply nested hierarchy of profiles — managers, their reports, their reports' reports, and so on. The naive approaches all had problems.

## The data

Imagine a profile table where each row has a \`parent_id\` referencing another profile:

\`\`\`sql
CREATE TABLE profiles (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  parent_id INT NULL
);
\`\`\`

For a given profile, I needed to find every descendant — at any depth.

## What I tried first

**N+1 queries from the application layer.** For each profile, query its children, then for each child query its children, and so on. It worked. It was also catastrophically slow on profiles with hundreds of descendants.

**Adjacency-list traversal in Java.** Slightly better, but still required loading huge subtrees into memory just to count them.

## The actual solution: recursive CTE

\`\`\`sql
WITH RECURSIVE descendants AS (
  -- Anchor: start with the target profile
  SELECT id, name, parent_id, 0 AS depth
  FROM profiles
  WHERE id = ?

  UNION ALL

  -- Recursive: join children
  SELECT p.id, p.name, p.parent_id, d.depth + 1
  FROM profiles p
  INNER JOIN descendants d ON p.parent_id = d.id
)
SELECT * FROM descendants;
\`\`\`

This runs once on the database. It walks the entire tree in a single query. No N+1, no loading huge subtrees into Java memory.

## Why it matters

The query went from 800ms (with N+1) to **12ms** for a typical profile with ~50 descendants. For the largest profiles in the system, the difference was even more dramatic.

## Caveats

- Available in **MySQL 8.0+** only
- PostgreSQL has had this since version 8.4 (2009)
- You need to set a recursion depth limit if you don't trust the data structure

If you have hierarchical data and you're traversing it from your application code, stop. There's a much better way.
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
