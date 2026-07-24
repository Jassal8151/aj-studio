import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description = 'AJ Studio - Professional Photography Portfolio specializing in Wedding, Portrait, and Landscape photography.',
  name = 'AJ Studio',
  type = 'website' 
}) => {
  return (
    <Helmet>
      <title>{title ? `${title} | AJ Studio` : 'AJ Studio | Professional Photography'}</title>
      <meta name="description" content={description} />
      
      {/* Facebook Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title ? `${title} | AJ Studio` : 'AJ Studio'} />
      <meta property="og:description" content={description} />
      
      {/* Twitter Tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | AJ Studio` : 'AJ Studio'} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
