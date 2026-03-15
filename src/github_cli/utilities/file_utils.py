import os
import shutil

def remove_file(file_name_for_delete: str) -> None:
    """Remove the specified file.

    Args:
        file_name_for_delete (str): Path to file to be deleted.

    Raises:
        ValueError: If an empty string is passed in.
    """

    # Check if the file name is a string and not empty
    if not isinstance(file_name_for_delete, str) or not file_name_for_delete:
        raise ValueError("File name must be a non-empty string")
    
    try:
        # Check if the path exists and is a regular file
        if os.path.exists(file_name_for_delete) and os.path.isfile(file_name_for_delete):
            os.remove(file_name_for_delete)
        else:
            print(f"The specified path {file_name_for_delete} does not exist or is not a file.")
    except PermissionError:
        print(f"You do not have permission to delete the file {file_name_for_delete}.")
    except OSError as e:
        print(f"Error deleting file {file_name_for_delete}: {e}")

def clean_directory(dir_to_be_deleted: str) -> None:
    """Delete the directory and all of its contents.

    Args:
        dir_to_be_deleted (str): Points to path to be deleted.
    """
    # Check if dir_to_be_deleted is None or not a string.
    if isinstance(dir_to_be_deleted, str) and dir_to_be_deleted:

        try:
            # Check if the directory exists before attempting to delete it
            if os.path.exists(dir_to_be_deleted) and os.path.isdir(dir_to_be_deleted):
                shutil.rmtree(dir_to_be_deleted)
        except OSError as e:
            print(f"Error deleting directory {dir_to_be_deleted}: {e}")
