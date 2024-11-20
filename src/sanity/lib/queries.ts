export const navBar_QUERY = `*[_type == "navBar" && language == $language][0]{
    links[]{ title, slug, path }
  }`;

export const projects_QUERY = `*[_type == "project" && language == $language] {
    _id,
    title,
    description,
    link,
    image
  }`;

export const hero_QUERY = `*[_type == "hero" && language == $language][0]{
    _id,
    intro,
    separator,
    jobs[],
    bio,
    currentProject,
    quotes[],
    profileImage,
    imageSubtitle,
    buttonContent
  }`;

export const contact_QUERY = `*[_type == "contact" && language == $language][0]{
    _id,
    description {
      title,
      subtitle
    },
    fields {
      inputs[] {
        label,
        placeholder,
        name
      },
      selects[] {
        label,
        placeholder,
        name,
        options
      }
    },
    button {
      value
    },
    errorMessages {
      name {
        min,
        max
      },
      email {
        invalid
      },
      phoneNumber {
        invalid
      },
      reason {
        min
      }
    },
    toast
  }`;

export const contact_email_exists_QUERY = `*[_type == "message" && language == $language && email == $email] {
  createdAt,
}`;
