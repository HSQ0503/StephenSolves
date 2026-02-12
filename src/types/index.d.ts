interface ChildNavigationLink {
  name: string;
  url: string;
}

interface NavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: ChildNavigationLink[];
}

interface Button {
  enable: boolean;
  label: string;
  link: string;
}

export interface RegularPage {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    canonical?: string;
    noindex?: boolean;
    lastModified?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
}

export interface HomePage extends RegularPage {
  frontmatter: {
    banner: {
      title: string;
      image: string;
      buttons: Button[];
      badge: {
        enable: boolean;
        label: string;
        images: string[];
      };
    };
  };
}

export interface FeaturesPage extends RegularPage {
  frontmatter: RegularPage["frontmatter"] & {
    page_header: {
      title: string;
      subtitle: string;
    };
  };
}

export interface ReviewsPage extends RegularPage {
  frontmatter: RegularPage["frontmatter"] & {
    page_header: {
      title: string;
      subtitle: string;
      button: Button;
      background_images: {
        enable: boolean;
        image_1: string;
        image_2: string;
        image_3: string;
      };
    };
  };
}

export interface PricingPage extends RegularPage {
  frontmatter: RegularPage["frontmatter"] & {
    page_header: {
      title: string;
      subtitle: string;
    };
  };
}

export interface ContactPage extends RegularPage {
  frontmatter: RegularPage["frontmatter"] & {
    page_header: {
      title: string;
      subtitle: string;
    };
  };
}

export interface BlogPage extends RegularPage {
  frontmatter: RegularPage["frontmatter"] & {
    hero: {
      title: string;
      description: string;
    };
  };
}

export interface BlogPost extends RegularPage {
  frontmatter: RegularPage["frontmatter"] & {
    date: string;
  };
}
// sections intertaces
export interface TrustedBrands {
  title: string;
  list: { brand: string; logo: string }[];
}

export interface UserStats {
  title: string;
  stats: { title: string; content: string }[];
}

export interface FeatureCarousel {
  frontmatter: {
    enable: boolean;
    title: string;
    subtitle: string;
    list: Array<{
      title: string;
      subtitle: string;
      icon: string;
      image: string;
      link?: string;
    }>;
  };
  slug?: string;
  content?: string;
}

export interface Features {
  frontmatter: {
    enable: boolean;
    features: Array<{
      title: string;
      badge: string;
      subtitle: string;
      button: Button;
      image: string;
    }>;
  };
  slug?: string;
  content?: string;
}

export interface MoreFeatures {
  frontmatter: {
    enable: boolean;
    title: string;
    subtitle: string;
    button: Button;
    list: Array<{
      title: string;
      subtitle: string;
      icon: string;
      image: string;
    }>;
  };
  slug?: string;
  content?: string;
}

export interface Integrations {
  frontmatter: {
    enable: boolean;
    title: string;
    subtitle: string;
    list: Array<{
      image: string;
      imageAlt: string;
    }>;
  };
  slug?: string;
  content?: string;
}

export interface Testimonial {
  frontmatter: {
    enable: boolean;
    title: string;
    button: Button;
    testimonials: Array<{
      name: string;
      content: string;
      rating: number;
    }>;
  };
  slug?: string;
  content?: string;
}

export interface Pricing {
  frontmatter: {
    title: string;
    subtitle: string;
    rate: number;
    rate_period: string;
    rate_prefix: string;
    features: string[];
    multi_session_note: string;
    button: Button;
  };
  slug?: string;
  content?: string;
}

export interface Faq {
  frontmatter: {
    title: string;
    list: Array<{
      question: string;
      answer: string;
    }>;
    haveQuestions: {
      enable: boolean;
      text: string;
      anchor: {
        label: string;
        link: string;
      };
    };
  };
  slug?: string;
  content?: string;
}

export interface CTA {
  frontmatter: {
    enable: boolean;
    title: string;
    description: string;
    button: Button;
    rotating_icons: string[];
  };
  slug?: string;
  content?: string;
}

export interface Reviews {
  frontmatter: {
    enable: boolean;
    list: Array<{
      name: string;
      review: string;
      stars: number;
    }>;
  };
  slug?: string;
  content?: string;
}
