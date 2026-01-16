import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import type { UserStats } from "@/types";

const UserStats = () => {
  const sectionData = getListPage<UserStats>("sections/user-stats.md");
  const { title, stats } = sectionData.frontmatter;

  return (
    <section className="section">
      <div className="container pb-20 border-b border-border">
        <div className="flex flex-col lg:flex-row justify-between max-lg:flex-wrap gap-8 lg:gap-20">
          <h2
            className="text-h3 max-w-[580px] heading-outline"
            dangerouslySetInnerHTML={markdownify(title)}
          />
          <div className="flex gap-10 lg:gap-20">
            {stats.map(({ title, content }) => (
              <div className="flex flex-col items-start" key={title}>
                <h3
                  className="text-h1-sm text-secondary font-semibold"
                  dangerouslySetInnerHTML={markdownify(title)}
                />
                <p
                  className="text-text"
                  dangerouslySetInnerHTML={markdownify(content)}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserStats;
