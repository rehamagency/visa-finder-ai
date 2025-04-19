
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
import {
  AlignRight,
  Search,
  BarChart,
  Home,
  CreditCard,
  User,
  LogOut,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-gradient">JobAgent AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition">
            Home
          </Link>
          <Link to="/search" className="text-foreground/80 hover:text-primary transition">
            Job Search
          </Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-primary transition">
            Pricing
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition">
                Dashboard
              </Link>
              {user.email === 'admin@example.com' && (
                <Link to="/admin" className="text-foreground/80 hover:text-primary transition">
                  Admin
                </Link>
              )}
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleSignOut} className="font-medium">Sign Out</Button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" className="font-medium" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button className="font-medium" asChild>
                <Link to="/auth?tab=register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <AlignRight size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fadeIn">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center p-2 rounded-md hover:bg-muted"
              onClick={toggleMenu}
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link 
              to="/search" 
              className="flex items-center p-2 rounded-md hover:bg-muted" 
              onClick={toggleMenu}
            >
              <Search size={18} className="mr-2" />
              Job Search
            </Link>
            <Link 
              to="/pricing" 
              className="flex items-center p-2 rounded-md hover:bg-muted"
              onClick={toggleMenu}
            >
              <CreditCard size={18} className="mr-2" />
              Pricing
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center p-2 rounded-md hover:bg-muted"
                  onClick={toggleMenu}
                >
                  <BarChart size={18} className="mr-2" />
                  Dashboard
                </Link>
                {user.email === 'admin@example.com' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center p-2 rounded-md hover:bg-muted"
                    onClick={toggleMenu}
                  >
                    <User size={18} className="mr-2" />
                    Admin
                  </Link>
                )}
                <hr className="border-border" />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }} 
                  className="w-full justify-start"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <hr className="border-border" />
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={toggleMenu} 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/auth">
                      <User size={18} className="mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    onClick={toggleMenu} 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/auth?tab=register">
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
