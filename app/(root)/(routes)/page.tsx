import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import { DefaultCompanions } from "@/components/default-companions";
import { Separator } from "@/components/separator";

// Define the props for the RootPage component
interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

// Define the RootPage component
const RootPage = async ({
  searchParams
}: RootPageProps) => {

  // Fetch default companions data from the database
  const defaultCompanions = await prismadb.companion.findMany({
    where: {
      isDefault: true, // Filter for default companions
      categoryId: searchParams.categoryId, // Filter by category
      name: {
        search: searchParams.name, // Filter by name
      },
    },
  });

  // Fetch non-default companions data from the database
  const data = await prismadb.companion.findMany({
    where: {
      isDefault: false, // Filter for non-default companions
      categoryId: searchParams.categoryId, // Filter by category
      name: {
        search: searchParams.name, // Filter by name
      },
    },
    orderBy: {
      createdAt: "desc" // Order by creation date in descending order
    },
    include: {
      _count: {
        select: {
          messages: true, // Include message count for each companion
        }
      }
    },
  });

  // Fetch category data from the database
  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput /> {/* Render the SearchInput component for searching */}
      <Categories data={categories} /> {/* Render the Categories component for displaying categories */} 
      <DefaultCompanions data={defaultCompanions}/> {/* Render the DefaultCompanions component for default companions */}
      <Separator /> {/* Render the Separator component for separation */}
      <Companions data={data} /> {/* Render the Companions component for displaying companions */}
    </div>
  );
}

export default RootPage;
