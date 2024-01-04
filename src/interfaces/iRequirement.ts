
type Ticon = 'Instagram' | 'Whatsapp' | 'Facebook' | 'Tiktok' | 'Twitter' | 'Twitch' | 'Pinterest' | 'Google' | 'Amazon' | undefined

interface iRequirement {
    passed: number;
    title: string;
    href: string;
    icon?: Ticon;
    valid: boolean;
}


export { iRequirement, Ticon }