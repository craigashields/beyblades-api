import fs from "fs";
import path from "path";
import matter from "gray-matter";
import siteMetadata from '@/data/siteMetadata'

const postsDirectory = path.join(process.cwd(), siteMetadata.contentDir);

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(filename: string) {
    // removes the file extension
    const postSlug = filename.replace(/\.md/, "");
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    const postData = {
        slug: postSlug,
          name: data.name,
          avatar: data.avatar,
          occupation: data.occupation,
          email: data.email,
          github: data.github,
        content,
    };

    return postData;
}