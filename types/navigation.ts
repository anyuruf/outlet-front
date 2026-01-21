import * as React from "react";


export interface NavbarNavItem {
    href?: string;
    label: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    logoHref?: string;
    navigationLinks?: NavbarNavItem[];
    userName?: string;
    userEmail?: string;
    userAvatar?: string;
    notificationCount?: number;
    onNavItemClick?: (href: string) => void;
    onInfoItemClick?: (item: string) => void;
    onNotificationItemClick?: (item: string) => void;
    onUserItemClick?: (item: string) => void;
    request?: Request;
}
