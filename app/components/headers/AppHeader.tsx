import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { InfoMenu } from '@/components/headers/InfoMenu';
import { UserMenu } from '@/components/headers/UserMenu';
import { cn } from '@/utils/misc'
import OutletLogoSVG from "@/components/headers/OutletLogoSVG";
import { NotificationMenu } from '@/components/headers/NotificationMenu'
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import SearchForm from "@/components/headers/SearchForm";
import ThemeSwitch from "@/components/headers/switch-toggle";
import MobilePopNav from "@/components/shadcn-studio/blocks/mobile-pop-nav";
import DesktopNav from "@/components/shadcn-studio/blocks/desktop-nav";
import ExpandableSearch from "@/components/headers/ExpandableSearch";
import type {NavbarProps} from "../../../types/navigation";
import { defaultNavigationLinks } from "@/utils/constants"


export const AppHeader = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logo = <OutletLogoSVG />,
      logoHref = '/',
      navigationLinks = defaultNavigationLinks,
      userName,
      userEmail,
      userAvatar,
      notificationCount = 8,
      onNavItemClick,
      onInfoItemClick,
      onNotificationItemClick,
      onUserItemClick,
      request,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement | null>(null);
    // Don't show mobile nav when side open
    const { open } = useSidebar();

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile((width < 1224) && !open); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [open]);

    // Combine refs
    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      if(!node) return;
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);


    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full max-w-9xl border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 [&_*]:no-underline',
          className
        )}
        {...props}
      >
        {/* Mobile Menu */}
        { isMobile &&
            <div className="inline-flex items-center justify-between w-full max-w-8xl gap-4 px-2 py-2 sm:px-4">
              {/****Left Side - Mobile Logo ****/}
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center px-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                {logo}
              </button>

              {/****Right Side - Mobile Menu Search ****/}
              <div className="inline-flex gap-1 md:gap-2 items-center">
                <ExpandableSearch />
                <MobilePopNav navigationLinks={navigationLinks} />
              </div>
            </div>
        }

        {/* Desktop Menu */}
        { !isMobile &&
          <div className="inline-flex items-center gap-2 px-2 py-3 sm:px-4 max-w-9xl justify-between w-full">
            {/****Left Side - Desktop Logo ****/}
            <div className="inline-flex gap-3 justify-between items-center">
              { !open && (<button
                onClick={(e) => e.preventDefault()}
                className="flex items-center px-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                {logo}
              </button> )}
              <SidebarTrigger className='[&_svg]:!size-4' />

              {/* Navigation menu */}
              <DesktopNav navigationLinks={navigationLinks} />
            </div>

            {/****In the Middle - Search form ****/}
            <div className="flex w-full px-3 items-center justify-center">
              <SearchForm />
            </div>

            {/* Right side */}
            <div className="inline-flex gap-1 items-center">
              {/* ThemeSwitch */}

              <ThemeSwitch request={request}/>

              {/* Info menu */}
              <InfoMenu onItemClick={onInfoItemClick} />

              {/* Notification */}
              <NotificationMenu
                notificationCount={notificationCount}
                onItemClick={onNotificationItemClick}
              />
              <UserMenu userName={userName} userEmail={userEmail} userAvatar={userAvatar}/>
            </div>
          </div>
        }
      </header>
    );
  }
);

AppHeader.displayName = 'AppHeader';
