import React from 'react';
import { Heart } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { Label } from '@librechat/client';
import CategoryIcon from '~/components/Prompts/Groups/CategoryIcon';
import store from '~/store';

export default function ListCard({
  category,
  name,
  snippet,
  onClick,
  children,
  promptId,
  showFavorites = true,
}: {
  category: string;
  name: string;
  snippet: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  children?: React.ReactNode;
  promptId?: string;
  showFavorites?: boolean;
}) {
  const [promptFavorites, setPromptFavorites] = useRecoilState(store.promptFavorites);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement | HTMLButtonElement>);
    }
  };

  const isFavorite = promptId ? promptFavorites.includes(promptId) : false;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!promptId) return;
    
    setPromptFavorites(prev => 
      prev.includes(promptId)
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    );
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="relative my-2 flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-border-light px-3 pb-4 pt-3 text-start align-top text-[15px] shadow-sm transition-all duration-300 ease-in-out hover:bg-surface-tertiary hover:shadow-lg"
      role="button"
      tabIndex={0}
      aria-labelledby={`card-title-${name}`}
      aria-describedby={`card-snippet-${name}`}
      aria-label={`Card for ${name}`}
    >
      <div className="flex w-full justify-between gap-2">
        <div className="flex flex-row gap-2">
          <CategoryIcon category={category} className="icon-md" aria-hidden="true" />
          <Label
            id={`card-title-${name}`}
            className="break-word select-none text-balance text-sm font-semibold text-text-primary"
            title={name}
          >
            {name}
          </Label>
        </div>
        <div className="flex items-center gap-2">
          {showFavorites && promptId && (
            <button
              onClick={handleToggleFavorite}
              className={`p-1 rounded transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-text-tertiary hover:text-red-500'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
          {children}
        </div>
      </div>
      <div
        id={`card-snippet-${name}`}
        className="ellipsis max-w-full select-none text-balance text-sm text-text-secondary"
      >
        {snippet}
      </div>
    </div>
  );
}
