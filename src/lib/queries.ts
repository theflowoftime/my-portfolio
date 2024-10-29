export const navBar_QUERY = `*[_type == "navBar" && language == $language][0]{
    links[]{ title, slug, path }
  }`;

export const projects_QUERY = `*[_type == "project" && language == $language] {
    _id,
    title,
    description,
    link,
  }`;
