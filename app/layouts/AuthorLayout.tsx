import SocialIcon from '@/components/social-icons';
import Image from 'next/image';
import ReactMarkdown from "react-markdown";
import Breaks from 'remark-breaks';

type PostType = {
  name: string;
  avatar: string;
  occupation: string;
  email: string;
  github: string;
  content: string;
};

interface Props {
  post: PostType;
}


const AuthorLayout: React.FC<Props> = ({ post }) => {
  const { name, avatar, occupation, email, github, content } = post;
  return (
    <>
      <div className="divide-y divide-gray-200">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500">{occupation}</div>
            <div className="mb-3 flex space-x-4 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
              <SocialIcon kind="github" href={github} size={6}/>
            </div>
          </div>
          <div className="xl:col-span-2">
              <article className="prose max-w-none pt-8 pb-8">
                <ReactMarkdown children={content} remarkPlugins={[Breaks]}/>       
              </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorLayout;






