import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import LazyImage from '@/components/LazyImage';
import LinkedCardItem from '@/components/LinkedCardItem';
import LinksGroup from '@/components/LinksGroup';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HIGHLIGHT_PROJECT } from '@/constants';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { formatDate } from '@/services';

import ThemedStats from './_components/ThemedStats';

const techs = ['ReactJs', 'React Native', 'NextJs', 'NodeJs', 'NestJs', 'Java Spring Boot'];

export default function Home({ params: { locale } }: LocaleParamsType) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Index');

  return (
    <main className="flex flex-wrap min-h-[calc(100dvh-352px)] xsm:min-h-[calc(100dvh-57px)] justify-around p-12">
      {/* Left side */}
      <div className="flex flex-col items-center sm:items-start">
        <LazyImage
          className="w-44 rounded-full"
          miniature={'/images/photo_sm.jpg'}
          src="/images/photo.jpg"
          alt="Alexandre Em, fullstack developer"
        />
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
            <a href={t('link')} target="_blank" className={cn(buttonVariants({ variant: 'outline' }), 'mr-5 mt-2 mb-2')}>
              {t('resume')}
            </a>
            <Link href="/projects" className={cn(buttonVariants({}), 'm-2')}>
              {t('projects')}
            </Link>
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
          alt="A french startup in the automobile sector, developing app using intern AI to detect vehicle damages by analysing photos"
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
          alt="Sorbone University, master in computer science, computer network and software engineering"
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
          alt="CFA Insta, master in computer science"
        />

        {/* Projects */}
        <h2 className="text-lg font-bold">{t('highlight')}</h2>
        <div className="p-1 flex flex-wrap justify-center sm:justify-start">
          {HIGHLIGHT_PROJECT.map((proj) => (
            <Card key={proj.id} className="m-2 w-fit">
              <Link href={`/projects/${proj.id}`} locale={locale}>
                <CardContent className="p-2">
                  <LazyImage
                    src={proj.images.length > 0 ? proj.images.find((img) => img.id === 0)!.url : '/images/no-image.png'}
                    className="max-w-[250px] h-[141px] object-cover"
                    alt="KanjiUp: an hybrid app developed with React Native, Nest/Node to help study kanji characters by drawing them"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start max-w-[250px]">
                  <h2 className="text-xl font-bold">{proj.title}</h2>
                  <CardDescription className="text-xs">
                    {formatDate(proj.dateStart)} - {proj.dateEnd ? formatDate(proj.dateEnd) : 'now'}
                  </CardDescription>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>

        {/* Github/Leetcode stats */}
        <Separator className="mt-3 mb-2" />
        <ThemedStats />
      </div>
    </main>
  );
}
