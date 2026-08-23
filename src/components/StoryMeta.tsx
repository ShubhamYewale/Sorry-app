import { Helmet } from 'react-helmet-async';

export function StoryMeta() {
  return (
    <Helmet>
      <title>A Little Something for Chimneee</title>
      <meta name="description" content="A little thing made by Shubham for Chimneee." />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    </Helmet>
  );
}
