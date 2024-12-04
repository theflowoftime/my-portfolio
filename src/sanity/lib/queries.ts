export const navBar_QUERY = `*[_type == "navBar" && language == $language][0]{
    links[],
    button,
    languages[],
    themes[]
  }`;

export const aboutMe_Query = `*[_type == "aboutMe" && language == $language][0] {
  introduction,
  career
}`;

export const projects_QUERY = `*[_type == "project" && language == $language] | order(dateTime(delivered_at) - dateTime(started_at)) {
    _id,
    title,
    description,
    link,
    image,
    started_at,
    delivered_at
  }`;

export const hero_QUERY = `*[_type == "hero" && language == $language][0]{
    mainTextLines[],
    secondaryText,
    buttonText,
    containerSizes[]
  }`;

export const contact_QUERY = `*[_type == "contact" && language == $language][0]{
    _id,
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
    button,
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
    toast,
    HeaderWords[]
  }`;

export const contact_email_exists_QUERY = `*[_type == "message" && language == $language && email == $email] {
  createdAt,
}`;
