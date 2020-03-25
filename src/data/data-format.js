export function groupSpeciesEvidences(values) {
  var groupedEvidences = {};

  if (!values) {
    return groupedEvidences;
  }

  for (const s of values) {
    groupedEvidences[s.name] = {};
    for (const e of s.evidence) {
      if (e.database in groupedEvidences[s.name]) {
        groupedEvidences[s.name][e.database].push({
          id: e.id,
          url: e.url
        });
      } else {
        groupedEvidences[s.name][e.database] = [
          {
            id: e.id,
            url: e.url
          }
        ];
      }
    }
  }
  return groupedEvidences;
}

export function groupEvidences(values) {
  var groupedEvidences = {};

  if (!values) {
    return groupedEvidences;
  }

  for (const value of values) {
    if (!groupedEvidences[value.database]) {
      groupedEvidences[value.database] = [];
    }

    groupedEvidences[value.database].push({
      id: value.id,
      url: value.url
    });
  }

  return groupedEvidences;
}
