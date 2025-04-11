// components/AuthModal.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  type: 'sign-in' | 'sign-up';
}

export const AuthModal = ({ type }: AuthModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant={type === 'sign-in' ? 'outline' : 'default'}
          className="flex items-center gap-2"
        >
          {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[99]" />

        {/* Modal Content */}
        <Dialog.Content className="fixed z-[100] left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button>
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded outline-none"
            />
            <Button className="w-full">
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
