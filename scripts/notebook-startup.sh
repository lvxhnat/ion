#!/bin/bash

# Declare Static Variables
VIRTUAL_ENVIRONMENT_NAME="ion-dev"
PYTHON_VIRTUAL_ENVIRONMENT_VERSION="3.9"
MINICONDA_SH_FILE="Miniconda3-latest-Linux-x86_64.sh"

# Install Conda 
if which conda >/dev/null;
then
    echo "$(tput setaf 4) Conda Distribution found. Updating Conda... $(tput setaf 0)"
    conda update conda --yes
else
    echo "$(tput setaf 4) No Matching Conda Distributions found. Installing MiniConda in base environment. $(tput setaf 0)"
    wget https://repo.anaconda.com/miniconda/$MINICONDA_SH_FILE
    chmod +x $MINICONDA_SH_FILE
    ./$MINICONDA_SH_FILE -b
    rm -rf ./$MINICONDA_SH_FILE
fi

# Answer yes to every conda question
conda config --env --set always_yes true

# Load the environment variables into environment
export $(xargs < .env) 

# Remove the virtual environment so we can recreate it
conda env remove -n $VIRTUAL_ENVIRONMENT_NAME

echo "$(tput setaf 4) Creating Development environment. This might take a while... $(tput setaf 0)"
# Init and Activate the conda environment
source "$(conda info | grep -i 'base environment' | awk '{print $4}')/etc/profile.d/conda.sh" && 
conda create --name $VIRTUAL_ENVIRONMENT_NAME python=$PYTHON_VIRTUAL_ENVIRONMENT_VERSION --no-default-packages 

conda init &&
echo "$(tput setaf 4) Activating Development environment. $(tput setaf 0)" &&
conda activate $VIRTUAL_ENVIRONMENT_NAME && 
pip install --upgrade pip && 
echo "$(tput setaf 4) Installing Dependencies. $(tput setaf 0)" &&
pip install -e . &&
echo "$(tput setaf 4) Installing jupyterlab and ipykernel. $(tput setaf 0)" &&
conda install jupyterlab ipykernel nb_conda

echo "$(tput setaf 4) Uninstalling and activating ipython kernel. $(tput setaf 0)"

if (jupyter kernelspec list | grep $VIRTUAL_ENVIRONMENT_NAME > /dev/null);
then 
jupyter kernelspec uninstall $VIRTUAL_ENVIRONMENT_NAME -y 
fi

python -m ipykernel install --user --name=$VIRTUAL_ENVIRONMENT_NAME

echo "$(tput setaf 4) Setup complete. Enjoy! 🎊 $(tput setaf 0)"
exit 0
