import groq from "groq";

export const navBar_QUERY = groq`*[_type == "navBar" && language == $language][0]{
    links[],
    button,
    languages[],
    themes[]
  }`;

export const aboutMe_Query = groq`*[_type == "aboutMe" && language == $language][0] {
  introduction,
  career
}`;

export const projects_QUERY = groq`*[_type == "project" && language == $language && isPublic == true]`;

export const project_QUERY = groq`*[_type == "project" && _id == $_id && language == $language && isPublic == true][0]`;

export const hero_QUERY = groq`*[_type == "hero" && language == $language][0] {
    mainTextLines {
      ...,
      line {
        ...,
        img {
          ...,
          image {
            ...,
            ...asset-> {
            altText,
            caption,
            ...metadata {
            lqip,
            ...dimensions {
            width,
            height
                }
              }
            }
          }
        }
      }     
    }[],
    secondaryText,
    buttonText,
    avatarSize[]
  }`;

export const contact_QUERY = groq`*[_type == "contact" && language == $language][0]{
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

export const contact_email_exists_QUERY = groq`*[_type == "message" && language == $language && email == $email] {
  createdAt,
}`;
