export type navLink =
    {
        type: "link";
        name: string;
        href: string;
    }
    | {
        type: "group";
        groupName: string;
        links: {
            name: string;
            href: string;
        }[];
    };
