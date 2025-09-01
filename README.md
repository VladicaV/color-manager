# Color Manager App

Responsive React application for managing color definitions.

## Features

- Add new colors (name + hex value)
- Delete existing colors
- List all colors with a small preview
- Search/filter colors by name or hex value
- Data is stored on a mock REST API (MockAPI.io)
- Loading and error states when fetching data
- Responsive design with hover effects

## Tech Stack

- React - Main framework
- Tailwind CSS - Styling with utility classes
- Context API - State management 
- Fetch API - for API calls
- MockApi - simple backend for CRUD operations
- CRACO - Configuration layer for Create React App

## Project Structure

```
src/
├── components/
│   ├── ColorContext.js      # State management and context provider
│   ├── ColorForm.js         # Form for adding new colors
│   ├── ColorFilter.js       # Search and filter functionality
│   ├── ColorItem.js         # Individual color display component
│   └── ColorList.js         # Grid layout for color display
├── services/
│   └── api.js               # API service for CRUD operations
├── App.js                   # Main application component
├── index.js                 # Application entry point
└── index.css                # Tailwind CSS and fallback styles
```

## Configuration Files

- **`tailwind.config.js`** - Tailwind CSS configuration
- **`postcss.config.js`** - PostCSS plugins configuration
- **`craco.config.js`** - CRACO configuration for webpack customization

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Usage

### Adding Colors
1. Enter a color name in the "Color Name" field
2. Enter a valid hex value in the "Hex Value" field
3. Watch the color preview update in real-time
4. Click the purple "Add Color" button to add the color to your palette
5. The system automatically prevents adding colors with existing names or hex values

### Filtering Colors
- Use the search bar to filter colors by name or hex value
- The filter works in real-time as you type
- Click the "×" button to clear the filter
- View count of filtered vs. total colors

### Managing Colors
- Hover over color cards to see additional options
- Click the clipboard icon to copy the hex value
- Click the trash icon to delete a color
- Click on the hex value text to copy it to clipboard

### API Integration
- All colors are stored and retrieved from the external REST API
- Full CRUD operations: GET (list), POST (create), DELETE (remove)
- Real-time synchronization with the server
- Loading states and error handling for all operations

## Features in Detail

### Color Validation
- Color names are required and trimmed of whitespace
- Hex values must be in the format #RRGGBB (6 characters after #)
- Real-time validation with visual feedback
- Dynamic color preview that scales when valid hex is entered

### UI Enhancements
- Primary button uses custom purple color (#5e2ecc)
- Clean SVG icons instead of emojis
- Color preview grows when valid hex is entered
- All interactions have smooth animations
- Subtle shadows that enhance on hover

### Responsive Design
- Desktop: 5 columns grid layout (xl breakpoint)
- Large screens: 4 columns grid layout (lg breakpoint)
- Medium screens: 3 columns grid layout (md breakpoint)
- Small screens: 2 columns grid layout (sm breakpoint)
- Mobile: 1 column grid layout
- Sticky header with backdrop blur effect

### State Management
- Uses React Context API for global state
- Efficient filtering and state updates
- Loading and error states for all operations
- Optimistic UI updates with proper error handling

## API Configuration

The application uses a mock API for demonstration purposes:
- **Base URL**: `https://68b4c25245c9016787711676.mockapi.io/colors`
- **Endpoints**: GET, POST, DELETE operations
- **Data Format**: JSON with color objects containing id, name, and hex properties

## Customization

### Adding New Features
The modular component structure makes it easy to add new features:


## Browser Support

- Chrome 
- Firefox 
- Safari 
- Edge 

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



---


