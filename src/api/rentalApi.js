// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/car-rentals";


const API_URL = "http://localhost:5000/api/car-rentals";
/**
 * ✅ Get All Car Rentals
 */
export async function getCarRentals() {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) {
      throw new Error("Failed to fetch car rentals");
    }
    const data = await res.json();
    // Backend sends array of rentals
    return data || [];
  } catch (err) {
    console.error("Error fetching car rentals:", err);
    return [];
  }
}

/**
 * ✅ Get Single Car Rental by Slug
 */
export async function getCarRentalBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch rental with slug: ${slug}`);
    }
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.error(`Error fetching rental ${slug}:`, err);
    return null;
  }
}

/**
 * ✅ Add New Car Rental
 */
export async function addCarRental(rentalData) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add rental");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error adding car rental:", err);
    return null;
  }
}

/**
 * ✅ Update Car Rental
 */
export async function updateCarRental(slug, rentalData) {
  try {
    const res = await fetch(`${API_URL}/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update rental");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error updating rental ${slug}:`, err);
    return null;
  }
}

/**
 * ✅ Delete Car Rental
 */
export async function deleteCarRental(slug) {
  try {
    const res = await fetch(`${API_URL}/${slug}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete rental");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error deleting rental ${slug}:`, err);
    return null;
  }
}
