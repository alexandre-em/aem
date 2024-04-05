import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import LazyImage from '@/components/LazyImage';
import LinkedCardItem from '@/components/LinkedCardItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const techs = ['ReactJs', 'React Native', 'NextJs', 'NodeJs', 'NestJs', 'Java Spring Boot'];

export default function Home({ params: { locale } }: LocaleParamsType) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Index');

  return (
    <main className="flex flex-wrap min-h-[calc(100vh-57px)] justify-around p-12">
      {/* Left side */}
      <div>
        <LazyImage className="bg-[url('/images/photo_sm.jpg')] w-44" src="/images/photo.jpg" />
        <h1 className="text-3xl font-black mt-4">{t('title')}</h1>
        <h2 className="text-lg font-bold">{t('subtitle')}</h2>
        <p>{t('description')}</p>
        <Separator className="m-3" />
        <div className="flex justify-center">
          <a href="https://github.com/alexandre-em" target="_blank">
            <Button variant="outline" className="mr-2 rounded-full w-14 h-14">
              <Github />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/em-a" target="_blank">
            <Button variant="outline" className="ml-2 mr-2 rounded-full w-14 h-14">
              <Linkedin />
            </Button>
          </a>
          <a href="mailto:alexandre.em@pm.me">
            <Button variant="outline" className="ml-2 rounded-full w-14 h-14">
              <Mail />
            </Button>
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col">
        <Separator className="flex sm:hidden mt-5 mb-5" />

        <div className="flex">
          {techs.map((tech) => (
            <Badge key={tech} className="ml-1 mr-1 bg-sky-400 hover:bg-sky-200">
              {tech}
            </Badge>
          ))}
        </div>
        <Separator className="mt-3 mb-2" />

        <h2 className="text-lg font-bold mb-3">{t('experience')}</h2>
        {/* Experience */}
        <LinkedCardItem
          title={t('exp-monk-title')}
          description={t('exp-monk-descr')}
          date={t('exp-monk-date')}
          url="https://monk.ai/"
          src="/images/monk.png"
        />

        {/* Education */}
        <Separator className="mt-3 mb-2" />

        <h2 className="text-lg font-bold mb-3">{t('education')}</h2>
        <LinkedCardItem
          title={t('ed-su-title')}
          description={t('ed-su-descr')}
          date={t('ed-su-date')}
          url="https://sciences.sorbonne-universite.fr/formation-sciences/masters/master-informatique/parcours-res-apprentissage-insta"
          src="/images/upmc.png"
        />
        <div className="w-full flex justify-center">
          <Separator orientation="vertical" className="h-5" />
        </div>
        <LinkedCardItem
          title={t('ed-insta-title')}
          description={t('ed-insta-descr')}
          date={t('ed-insta-date')}
          url="https://cfa-insta.fr/analyste-developpeur/"
          src="/images/insta.jpg"
        />
      </div>
    </main>
  );
}
