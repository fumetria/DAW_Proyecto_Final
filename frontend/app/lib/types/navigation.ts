import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type navLink =
    {
        type: "link";
        name: string;
        href: string;
        icon: IconDefinition;
    }
    | {
        type: "group";
        groupName: string;
        links: {
            name: string;
            href: string;
        }[];
        icon: IconDefinition;
    };
