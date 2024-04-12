import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import LazyImage from '@/components/LazyImage';
import LinkedCardItem from '@/components/LinkedCardItem';
import LinksGroup from '@/components/LinksGroup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import ThemedStats from './_components/ThemedStats';

const techs = ['ReactJs', 'React Native', 'NextJs', 'NodeJs', 'NestJs', 'Java Spring Boot'];

export default function Home({ params: { locale } }: LocaleParamsType) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Index');

  return (
    <main className="flex flex-wrap min-h-[calc(100dvh-352px)] xsm:min-h-[calc(100dvh-57px)] justify-around p-12">
      {/* Left side */}
      <div className="flex flex-col items-center sm:items-start">
        <LazyImage className="w-44 rounded-full" miniature={'/images/photo_sm.jpg'} src="/images/photo.jpg" />
        <h1 className="text-3xl font-black mt-4">{t('title')}</h1>
        <h2 className="text-lg font-bold">{t('subtitle')}</h2>
        <p>{t('description')}</p>
        <Separator className="mt-2 mb-3" />
        <LinksGroup />
      </div>

      {/* Right Side */}
      <div className="flex flex-col mt-5 sm:mt-0">
        <Separator className="flex sm:hidden mt-5 mb-5" />

        <div className="flex flex-wrap flex-col items-center justify-evenly w-full sm:items-start">
          <p className="w-1/2 text-center font-bold text-2xl sm:text-start">
            Passionate creating great experiences for Digital Product
          </p>
          <div className="flex flex-wrap justify-evenly m-2 w-full sm:justify-start">
            <Button variant="outline" className="mr-5 mt-2 mb-2">
              <a href="https://drive.google.com/file/d/1yiToT9R1EXYW18tS5wx3KMM2ZFhmPu86/view?pli=1" target="_blank">
                {t('resume')}
              </a>
            </Button>
            <Button className="m-2">
              <Link href="/projects">{t('projects')}</Link>
            </Button>
          </div>
        </div>

        {/* Keywords: tech skills */}
        <div className="flex flex-wrap justify-center mt-3">
          {techs.map((tech) => (
            <Badge key={tech} className="m-1 bg-sky-400 hover:bg-sky-200">
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

        {/* Github/Leetcode stats */}
        <Separator className="mt-3 mb-2" />
        <ThemedStats />
      </div>
    </main>
  );
}
