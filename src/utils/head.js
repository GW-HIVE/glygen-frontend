import React from 'react';

const head = {
  home: {
    title: 'Home | Informatics Resources for Glycoscience | GlyGen.org',
    meta: [
      {
        name: 'description',
        content: "GlyGen is a data integration and dissemination project for carbohydrate and glycoconjugate related data."
      },
      {
        name: 'keywords',
        content: 'glycan search, protein search, glycoprotein search, quick search, try me, data, data integration, SPARQL, help, contact us, resources, tutorials, explore, how to cite, data integration, data standarization, NIH project.'
      }
    ]
  },
  resources: {
    title: 'Resources | Data Resources | Tools | Organizations | glygen.org',
    meta: [
      {
        name: 'description',
        content: 'List of glyomics and glycoproteomics resources useful for researchers. Resources include data resources, tools, organizations, learn glycobiology, database, knowledgebase, repository, tool collection, video, e-book.'
      },
      {
        name: "keywords",
        content: 'data resources, tools, organizations, learn glycobiology, database, knowledgebase, repository, tool collection, video, e-book, glycomics, glycoproteomics.'
      }
    ]
  },
  // Keep a newPage metadata empty and use it as a template. Cpy & Past & Add yuur data into it
  // You can find existing metadata at the link below or at the old glygen code
  // https://docs.google.com/spreadsheets/d/1plY03kEvr2iAQ86sNUr2hobnwnynLf5t9p7G3GSLKI4/edit#gid=0
  newPge: {
    title: '',
    meta: [
      {
        name: 'description',
        content: ''
      },
      {
        name: "keywords",
        content: ''
      }
    ]
  }
};

const getMeta = page => {
  if (page && page.meta) return page.meta.map((value, index) => <meta key={index} {...value} />);
  return "";
};

export { getMeta, head };