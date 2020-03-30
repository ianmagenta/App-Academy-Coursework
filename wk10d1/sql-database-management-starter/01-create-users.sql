-- In this file, you will create some users for later exercises.

-- Create the following normal users with the indicated names and passwords
-- | name                   | password |
-- |------------------------|----------|
-- | aa_times               | 6g73WE2V |
-- | project_management_app | Q3HphPJ8 |

create user aa_times with password '6g73WE2V';
create user project_management_app with password 'Q3HphPJ8';


-- Create the following superuser with the indicated name and password
-- | name       | password |
-- |------------|----------|
-- | data_admin | ik2fiDri |

create user data_admin with password 'ik2fiDri' superuser;
